import { create, ApisauceInstance } from 'apisauce';
import { HttpAdapter } from './http.adapter';

interface Options {
    baseUrl: string;
    params: Record<string, string>;
}

export class ApisauceAdapter implements HttpAdapter {
    private api: ApisauceInstance;
    private cacheProxy: Record<string, any>;

    constructor(options: Options) {
        console.log(options.baseUrl,"hereeeee");
        
        this.api = create({
            baseURL: options.baseUrl,
            params: options.params,
        });

        this.cacheProxy = new Proxy<Record<string, any>>({}, {
            get: (target, prop: string) => {
                if (target[prop]) {
                    console.log("Returning from cache:", prop);
                    return target[prop].data; // Devuelve solo los datos del caché
                }
                return undefined;
            },
            set: (target, prop: string, value: any) => {
                console.log("Caching result for:", prop);
                target[prop] = {
                    data: value,
                    timestamp: Date.now() // Agregamos timestamp para posible expiración
                };
                return true;
            }
        });
    }

    async get<T>(url: string, options?: Record<string, unknown>): Promise<T> {
        // Crear clave única con parámetros
        const paramsString = options ? new URLSearchParams(options as Record<string, string>).toString() : '';
        const cacheKey = `${url}?${paramsString}`;

        // Verificar caché
        if (this.cacheProxy[cacheKey]) {
            return this.cacheProxy[cacheKey];
        }

        try {
            const response = await this.api.get<T>(url, options);
            
            if (response.ok && response.data) {
                // Almacenar en caché con la clave única
                this.cacheProxy[cacheKey] = response.data;
                return response.data;
            }
            throw new Error(`Error fetching: ${url}`);
        } catch (error) {
            console.error("API Error:", error);
            throw new Error(`Error in Apisauce GET: ${error}`);
        }
    }
}