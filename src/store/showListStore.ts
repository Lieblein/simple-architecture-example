import { create } from 'zustand';
import { type IShow } from '@api/show';
import searchShows from '@tasks/searchShows';

export interface IShowListFilter {
    search: string;
    selectedGenres: string[];
}
const defaultFilter: IShowListFilter = {
    search: '',
    selectedGenres: [],
};

export interface IPagination {
    activePage: number;
    totalPages: number;
}
const defaultPagination: IPagination = {
    activePage: 1,
    totalPages: 0,
};

interface IShowListState {
    shows: IShow[];
    isLoading: boolean;
    filter: IShowListFilter;
    pagination: IPagination;
    availableGenres: string[];
}

const defaultState: IShowListState = {
    shows: [],
    isLoading: false,
    availableGenres: [],
    filter: defaultFilter,
    pagination: defaultPagination,
};

interface IShowListActions {
    getShows: (filter: IShowListFilter, pagination: IPagination) => Promise<void>;
    changeFilter: (filter: IShowListFilter) => Promise<void>;
    changeSearch: (search: string) => Promise<void>;
    changeSelectedGenres: (genres: string[]) => Promise<void>;
    changeActivePage: (page: number) => Promise<void>;
    reset: () => void;
}

type IShowListStore = IShowListState & IShowListActions;

export const useShowListStore = create<IShowListStore>((set) => ({
    ...defaultState,

    getShows: async (
        filter: IShowListFilter,
        pagination: IPagination,
    ) => {
        set({ isLoading: true });

        const response = await searchShows({
            query: filter.search,
            genres: filter.selectedGenres,
            page: pagination.activePage,
        });

        if (response) {
            const {
                shows,
                pagination,
                availableGenres,
            } = response;
            set({
                shows,
                pagination,
                availableGenres,
                isLoading: false,
            });
        }
    },

    changeFilter: async (filter: IShowListFilter) => {
        const state = useShowListStore.getState();
        const pagination: IPagination = {
            ...state.pagination,
            activePage: 1,
        };

        set({
            filter,
            pagination,
        });

        await state.getShows(filter, pagination);
    },

    changeSearch: async (search) => {
        const state = useShowListStore.getState();
        await state.changeFilter( {
            ...state.filter,
            search,
        });
    },

    changeSelectedGenres: async (selectedGenres) => {
        const state = useShowListStore.getState();
        await state.changeFilter( {
            ...state.filter,
            selectedGenres,
        });
    },

    changeActivePage: async (page) => {
        const state = useShowListStore.getState();

        const pagination: IPagination = {
            ...state.pagination,
            activePage: page,
        };
        set({ pagination });

        await state.getShows(state.filter, pagination);
    },

    reset: () => set(defaultState),
}));
