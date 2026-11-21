import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { type IShow } from '@api/show';
import { type IPagination } from '@ui/pagination';

export interface IShowListFilter {
    search: string;
    selectedGenres: string[];
}

interface IShowListState {
    shows: IShow[];
    filter: IShowListFilter;
    pagination: IPagination;
    availableGenres: string[];
    isLoading: boolean;
}

interface IShowListActions {
    setShows: (shows: IShow[]) => void;
    setFilter: (filter: IShowListFilter) => void;
    setPage: (page: number) => void;
    setTotalPages: (totalPages: number) => void;
    setAvailableGenres: (genres: string[]) => void;
    setIsLoading: (isLoading: boolean) => void;
    reset: () => void;
}

type IShowListStore = IShowListState & IShowListActions;

const defaultFilter: IShowListFilter = {
    search: '',
    selectedGenres: [],
};

const defaultPagination: IPagination = {
    activePage: 1,
    totalPages: 0,
};

const useShowListStore = create<IShowListStore>()(
    immer((set) => ({
        shows: [],
        filter: defaultFilter,
        pagination: defaultPagination,
        availableGenres: [],
        isLoading: false,

        setShows: (shows) => set({ shows }),

        setFilter: (filter) => set({ filter }),

        setPage: (page) => set((state) => { state.pagination.activePage = page; }),

        setTotalPages: (totalPages) => set((state) => { state.pagination.totalPages = totalPages; }),

        setAvailableGenres: (availableGenres) => set({ availableGenres }),

        setIsLoading: (isLoading) => set({ isLoading }),

        reset: () => set({
            shows: [],
            filter: defaultFilter,
            pagination: defaultPagination,
            availableGenres: [],
            isLoading: false,
        }),
    })),
);

export default useShowListStore;
