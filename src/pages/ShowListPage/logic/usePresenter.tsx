import { useShallow } from 'zustand/shallow';
import { useEffect } from 'react';
import useShowListStore from '@store/showListStore';
import useFavoritesStore from '@store/favoritesStore';

export default function usePresenter() {
    const {
        pagination,
        isLoading,
        changeActivePage,
        shows,
    } = useShowListStore(
        useShallow(({
            pagination,
            isLoading,
            changeActivePage,
            shows,
        }) => ({
            pagination,
            isLoading,
            changeActivePage,
            shows,
        })),
    );

    const {
        getFavorites,
        favoriteShows,
    } = useFavoritesStore(
        useShallow(({
            getFavorites,
            favoriteShows,
        }) => ({
            getFavorites,
            favoriteShows,
        })),
    );

    useEffect(() => {  getFavorites(); }, []);

    return {
        pagination,
        isLoading,
        changeActivePage,
        pageShows: shows,
        favoriteShows,
    };
}