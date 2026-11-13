import { create } from 'zustand';
import { type IShow } from '@api/show';
import { getListForPage, getPagesCount } from '@utils/pagination';
import { sendRequest } from '@utils/request';
import { useNotificationStore } from './notificationStore';

const ITEMS_PER_PAGE = 3;

let abortController: AbortController | null = null;

interface IShowListState {
    search: string;
    shows: IShow[];
    isLoading: boolean;
    selectedGenres: string[];
    activePage: number;
}

interface IShowListActions {
    changeSearch: (search: string) => Promise<void>;
    changeSelectedGenres: (genres: string[]) => void;
    changeActivePage: (page: number) => void;
    resetFilter: () => void;
}

type ShowListStore = IShowListState & IShowListActions;

export const useShowListStore = create<ShowListStore>((set) => ({
    search: '',
    shows: [],
    isLoading: false,
    selectedGenres: [],
    activePage: 1,

    changeSearch: async (search: string) => {
        abortController?.abort();
        abortController = new AbortController();

        set({
            search,
            activePage: 1,
            isLoading: true,
        });

        if (search.trim() === '') {
            abortController = null;
            set({ shows: [], isLoading: false });
            return;
        }

        try {
            const data = await sendRequest<Array<{ score: number; show: IShow }>>(
                'GET',
                `https://api.tvmaze.com/search/shows?q=${search.trim()}`, // `/api/search/shows?q=${search.trim()}`,
                abortController.signal,
            );
            const shows = data.map(({ show }) => show);
            set({ shows, isLoading: false });
        } catch (error) {
            if (error instanceof Error && error.name === 'AbortError') {
                return;
            }

            useNotificationStore.getState().addNotification('Ошибка загрузки данных', 'error');
            set({ isLoading: false });
        }
    },

    changeSelectedGenres: (genres) => set({ selectedGenres: genres, activePage: 1 }),
    changeActivePage: (page) => set({ activePage: page }),
    resetFilter: () => set({ search: '', shows: [], selectedGenres: [], activePage: 1 }),
}));

export const selectFilteredShows = (state: IShowListState) =>
    state.shows.filter(({ genres }) =>
        state.selectedGenres.length === 0 ||
        state.selectedGenres.some((selectedGenre) => genres.includes(selectedGenre))
    );

export const selectPageShows = (state: IShowListState) => getListForPage(selectFilteredShows(state), state.activePage, ITEMS_PER_PAGE);

export const selectPagesCount = (state: IShowListState) => getPagesCount(selectFilteredShows(state), ITEMS_PER_PAGE);
