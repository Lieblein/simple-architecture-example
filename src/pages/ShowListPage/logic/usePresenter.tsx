import { useShallow } from 'zustand/shallow';
import { useShowListStore } from '@store/showListStore';

export default function usePresenter() {
    const {
        pagination,
        isLoading,
        changeActivePage,
        shows,
    } = useShowListStore(
        useShallow(({
            pagination,
            isLoading,
            changeActivePage,
            shows,
        }) => ({
            pagination,
            isLoading,
            changeActivePage,
            shows,
        })),
    );

    return {
        activePage: pagination.activePage,
        isLoading,
        changeActivePage,
        pageShows: shows,
        pagesCount: pagination.totalPages,
    };
}