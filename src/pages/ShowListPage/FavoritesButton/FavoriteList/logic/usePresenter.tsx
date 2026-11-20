import useFavoritesStore from '@store/favoritesStore';
import useLoadFavorites from './useLoadFavorites';

export default function usePresenter() {
    const favoriteShows = useFavoritesStore(({ favoriteShows }) => favoriteShows);
    const isLoading = useLoadFavorites();

    return {
        favoriteShows: Array.from(favoriteShows.values()),
        isLoading,
    };
}
