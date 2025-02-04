import { HttpAdapter } from "../../../config/adapters/http.adapter";
import { ComicsResponse } from "../../../infrastructure/interfaces/heroe-db.response";
import { HeroesMapper } from "../../../infrastructure/mappers/heroes.mapper";
import { Comics } from "../../modelos/heroes.entity";

interface Options {
    offset: number;
    limit: number;
}

export const getComicsByIdUseCase = async (
    fetcher: HttpAdapter,
    heroeId: number,
    options: Options,
): Promise<Comics[]> => {
    try {
        const comics = await fetcher.get<ComicsResponse>(`/v1/public/characters/${heroeId}/comics`, {
            offset: options.offset,
            limit: options.limit,
        });
        return comics.data.results.map(HeroesMapper.fromComicsDBToEntity);
    } catch (error) {
        throw new Error(`Can not get heroe by id: ${heroeId}` );
        


    }

}