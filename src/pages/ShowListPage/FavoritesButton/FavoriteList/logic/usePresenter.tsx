import { useShallow } from 'zustand/shallow';
import useFavoritesStore from '@store/favoritesStore';

export default function usePresenter() {
    const {
        favoriteShows,
        isLoading,
    } = useFavoritesStore(
        useShallow(({
            favoriteShows,
            isLoading,
        }) => ({
            favoriteShows,
            isLoading,
        })),
    );

    return {
        favoriteShows: Array.from(favoriteShows.values()),
        isLoading,
    };
}
