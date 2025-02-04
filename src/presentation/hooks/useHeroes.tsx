import { useEffect, useState } from "react";
import { Heroes } from "../../core/modelos/heroes.entity";
import * as UseCases from '../../core/useCases';
import { heroesDBFetcher } from "../../config/adapters/heroesDB.adapter";

export const useHeroes = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [heroes, setHeroes] = useState<Heroes[]>([]);
    const [offset, setOffset] = useState(0);
    const limit = 30;

    useEffect(() => {
        initialLoad();
    }, []);

    const initialLoad = async () => {
        try {
            const heroesData = await UseCases.HeroesCase(heroesDBFetcher, { offset: 0, limit });
            const filteredHeroes = filterHeroes(heroesData);  // Filtramos los héroes
            setHeroes(filteredHeroes);
        } catch (error) {
            console.error("Error loading Heroes:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadNextPage = async () => {
        try {
            const newOffset = offset + limit;
            const newHeroes = await UseCases.HeroesCase(heroesDBFetcher, { 
                offset: newOffset, 
                limit 
            });
            const filteredHeroes = filterHeroes(newHeroes);  // Filtramos los nuevos héroes
            setHeroes(prev => [...prev, ...filteredHeroes]);
            setOffset(newOffset);
        } catch (error) {
            console.error("Error loading next heroes:", error);
        } 
    };

    // Función para filtrar los héroes
    const filterHeroes = (heroesData: Heroes[]) => {
        return heroesData.filter(hero => 
            !hero.thumbnail.includes('image_not_available')
        );
    };

    return {
        isLoading,
        heroes,
        nextHeroes: loadNextPage
    };
};
