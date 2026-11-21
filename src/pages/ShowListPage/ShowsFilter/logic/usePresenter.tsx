import { useShallow } from 'zustand/shallow';
import useShowListStore from '@store/showListStore';
import searchShows from '../../logic/tasks/searchShows';

export default function usePresenter() {
    const {
        filter,
        pagination,
    } = useShowListStore(
        useShallow(({
            filter,
            pagination,
        }) => ({
            filter,
            pagination,
        })),
    );
    const onReset = () => {
        searchShows({
            query: '',
            genres: [],
            page: 1,
        });
    };

    const onChangeSearch = (search: string) => {
        searchShows({
            query: search,
            genres: filter.selectedGenres,
            page: pagination.activePage,
        });
    };

    const onChangeSelectedGenres = (genres: string[]) => {
        searchShows({
            query: filter.search,
            genres,
            page: pagination.activePage,
        });
    };

    return {
        filter,
        onChangeSearch,
        onChangeSelectedGenres,
        onReset,
    };
}
