import { HttpAdapter } from "../../../config/adapters/http.adapter";
import { HeroesResponse } from "../../../infrastructure/interfaces/heroes-db.responses";
import { HeroesMapper } from "../../../infrastructure/mappers/heroes.mapper";
import type { Heroes } from "../../modelos/heroes.entity";

interface Options {
    offset: number;
    limit: number;
}

export const HeroesCase = async (
    fetcher: HttpAdapter,
    options: Options
): Promise<Heroes[]> => {
    try {
        const heroes = await fetcher.get<HeroesResponse>('/v1/public/characters', {
            offset: options.offset,
            limit: options.limit,
        });

        return heroes.data.results.map(HeroesMapper.fromHeroesDBResultToEntity);
    } catch (error) {
        console.error("Error in HeroesCase:", error);
        throw new Error("Error fetching heroes");
    }
}