import { create } from 'zustand';
import { type IShow } from '@api/show';
import { getListForPage, getPagesCount } from '@utils/pagination';
import { changeSearch } from '@tasks/changeSearch';

const ITEMS_PER_PAGE = 3;

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

    changeSearch,
    changeSelectedGenres: (genres) => set({ selectedGenres: genres, activePage: 1 }),
    changeActivePage: (page) => set({ activePage: page }),
    resetFilter: () => set({
        search: '',
        shows: [],
        selectedGenres: [],
        activePage: 1,
    }),
}));

export const selectFilteredShows = (state: IShowListState) =>
    state.shows.filter(({ genres }) =>
        state.selectedGenres.length === 0 ||
        state.selectedGenres.some((selectedGenre) => genres.includes(selectedGenre))
    );

export const selectPageShows = (state: IShowListState) => getListForPage(selectFilteredShows(state), state.activePage, ITEMS_PER_PAGE);

export const selectPagesCount = (state: IShowListState) => getPagesCount(selectFilteredShows(state), ITEMS_PER_PAGE);