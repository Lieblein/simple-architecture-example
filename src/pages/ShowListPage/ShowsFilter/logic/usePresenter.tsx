import { useShallow } from 'zustand/shallow';
import useShowListStore from '@store/showListStore';

export default function usePresenter() {
    const {
        filter,
        changeSearch,
        changeSelectedGenres,
        reset,
    } = useShowListStore(
        useShallow(({
            filter,
            changeSearch,
            changeSelectedGenres,
            reset,
        }) => ({
            filter,
            changeSearch,
            changeSelectedGenres,
            reset,
        })),
    );

    return {
        search: filter.search,
        selectedGenres: filter.selectedGenres,
        changeSearch,
        changeSelectedGenres,
        reset,
    };
}