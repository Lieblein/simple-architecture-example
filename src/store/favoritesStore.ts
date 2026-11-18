import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import toggleFavorite from '@tasks/toggleFavorite';
import sendRequest from '@tasks/sendRequest';
import { type IShow } from '@api/show';

interface IFavoritesState {
    favoriteShows: Map<number, IShow>;
    isLoading: boolean;
}

interface IFavoritesActions {
    getFavorites: () => Promise<void>;
    toggleShowFavorite: (show: IShow, newIsFavorite: boolean) => Promise<void>;
}

type FavoritesStore = IFavoritesState & IFavoritesActions;

const useFavoritesStore = create<FavoritesStore>()(
    immer((set) => ({
        favoriteShows: new Map(),
        isLoading: false,

        getFavorites: async () => {
            set({ isLoading: true });
            const favorites = await sendRequest<IShow[]>('GET', '/api/favorite');

            set({
                favoriteShows: new Map(favorites.map((show) => [show.id, show])),
                isLoading: false,
            });
        },

        toggleShowFavorite: async (show, newIsFavorite) => {
            await toggleFavorite(show, newIsFavorite);

            if (newIsFavorite) {
                set((state) => {
                    state.favoriteShows.set(show.id, show);
                });
            } else {
                set((state) => {
                    state.favoriteShows.delete(show.id);
                });
            }
        },
    })),
);

export default useFavoritesStore;
