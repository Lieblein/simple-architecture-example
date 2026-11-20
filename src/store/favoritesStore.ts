import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { type IShow } from '@api/show';

interface IFavoritesState {
    favoriteShows: Map<number, IShow>;
}

interface IFavoritesActions {
    setFavorites: (favoriteShows: Map<number, IShow>) => void;
    addToFavorites: (show: IShow) => void;
    deleteFromFavorites: (show: IShow) => void;
}

type FavoritesStore = IFavoritesState & IFavoritesActions;

const useFavoritesStore = create<FavoritesStore>()(
    immer((set) => ({
        favoriteShows: new Map(),

        setFavorites: (favoriteShows) => set({ favoriteShows }),
    
        addToFavorites: (show) => set((state) => {
            state.favoriteShows.set(show.id, show);
        }),

        deleteFromFavorites: (show) => set((state) => {
            state.favoriteShows.delete(show.id);
        }),
    })),
);

export default useFavoritesStore;
