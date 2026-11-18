import useFavoritesStore from '@store/favoritesStore';

export default function usePresenter() {
    const favoriteShows = useFavoritesStore(({ favoriteShows }) => favoriteShows);

    return {
        favoriteShows: Array.from(favoriteShows.values()),
    };
}
