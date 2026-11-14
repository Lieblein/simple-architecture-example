import { useShallow } from 'zustand/shallow';
import { useShowListStore } from '@store/showListStore';

export default function usePresenter() {
    const {
        search,
        selectedGenres,
        changeSearch,
        changeSelectedGenres,
        resetFilter,
    } = useShowListStore(
        useShallow(({
            search,
            selectedGenres,
            changeSearch,
            changeSelectedGenres,
            resetFilter,
        }) => ({
            search,
            selectedGenres,
            changeSearch,
            changeSelectedGenres,
            resetFilter,
        })),
    );

    return {
        search,
        selectedGenres,
        changeSearch,
        changeSelectedGenres,
        resetFilter,
    };
}