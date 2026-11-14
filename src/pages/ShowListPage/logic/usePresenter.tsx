import { useShallow } from 'zustand/shallow';
import { useShowListStore, selectPageShows, selectPagesCount } from '@store/showListStore';

export default function usePresenter() {
    const {
        activePage,
        isLoading,
        changeActivePage,
    } = useShowListStore(
        useShallow(({
            activePage,
            isLoading,
            changeActivePage,
        }) => ({
            activePage,
            isLoading,
            changeActivePage,
        })),
    );

    const pageShows = useShowListStore(useShallow(selectPageShows));
    const pagesCount = useShowListStore(useShallow(selectPagesCount));

    return {
        activePage,
        isLoading,
        changeActivePage,
        pageShows,
        pagesCount,
    };
}