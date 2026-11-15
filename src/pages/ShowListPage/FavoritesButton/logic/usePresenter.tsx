import useFavoritesStore from '@store/favoritesStore';
import { useShallow } from 'zustand/shallow';

export default function usePresenter() {
    const favoriteShows = useFavoritesStore(({ favoriteShows }) => favoriteShows);

    return {
        favoriteCount: favoriteShows.size,
    };
}