import React, { useEffect, useState } from 'react'
import * as UseCases from '../../core/useCases';
import { heroesDBFetcher } from '../../config/adapters/heroesDB.adapter';
import { Comics } from '../../core/modelos/heroes.entity';


export const useComics = (heroeId: number) => {

    const [isLoading, setIsLoading] = useState(true);
    const [comics, setComics] = useState<Comics[]>([]);
    const [offset, setOffset] = useState(0);
    const limit = 20;

    useEffect(() => {
        loadComics();
    }, [heroeId])

    const loadComics = async () => {
        setIsLoading(true);
        const Comics = await UseCases.getComicsByIdUseCase(heroesDBFetcher, heroeId, { offset: 0, limit });
        setComics(Comics)
        setIsLoading(false);
    }

    const loadNextPage = async () => {
        try {
            const newOffset = offset + limit;
            const newComics = await UseCases.getComicsByIdUseCase(heroesDBFetcher,heroeId, { 
                offset: newOffset, 
                limit 
            });
            if (newComics.length != 0) {
                setComics(prev => [...prev, ...newComics]);
                setOffset(newOffset);    
            }
            
        } catch (error) {
            console.error("Error loading next heroes:", error);
        }
    };

    return {
        isLoading,
        comics,
        nextComics: loadNextPage

    }
}
