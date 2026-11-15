import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import toggleFavorite from '@tasks/toggleFavorite';
import sendRequest from '@tasks/sendRequest';

interface IFavoritesState {
    favoriteShows: Set<number>;
    isLoading: boolean;
}

interface IFavoritesActions {
    getFavorites: () => Promise<void>;
    toggleShowFavorite: (showId: number, newIsFavorite: boolean) => Promise<void>;
}

type FavoritesStore = IFavoritesState & IFavoritesActions;

const useFavoritesStore = create<FavoritesStore>()(
    immer((set) => ({
        favoriteShows: new Set(),
        isLoading: false,

        getFavorites: async () => {
            set({ isLoading: true });
            const favorites = await sendRequest<number[]>('GET', '/api/favorite');
            set({
                favoriteShows: new Set(favorites),
                isLoading: false,
            });
        },

        toggleShowFavorite: async (showId, newIsFavorite) => {
            await toggleFavorite(showId, newIsFavorite);

            if (newIsFavorite) {
                set((state) => {
                    state.favoriteShows.add(showId);
                });
            } else {
                set((state) => {
                    state.favoriteShows.delete(showId);
                });
            }
        },
    })),
);

export default useFavoritesStore;
