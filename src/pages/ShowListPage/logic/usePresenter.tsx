import { useShallow } from 'zustand/shallow';
import useShowListStore from '@store/showListStore';
import searchShows from './tasks/searchShows';

export default function usePresenter() {
    const {
        filter,
        pagination,
        shows,
        isLoading,
    } = useShowListStore(
        useShallow(({
            filter,
            pagination,
            shows,
            isLoading,
        }) => ({
            filter,
            pagination,
            shows,
            isLoading,
        })),
    );

    // TODO: описать запрет реактивности и лишнего использования useEffect
    const onChangeActivePage = (page: number) => {
        searchShows({
            query: filter.search,
            genres: filter.selectedGenres,
            page,
        });
    };

    return {
        pagination,
        isLoading,
        pageShows: shows,
        onChangeActivePage,
    };
}
