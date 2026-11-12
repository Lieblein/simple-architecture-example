import usePresenter from './usePresenter';
import ShowCard from './components/ShowCard';
import Pagination from './components/Pagination';
import ShowsFilter from './components/ShowsFilter';
import ShowCardSkeleton from './components/ShowCardSkeleton';
import LoaderOverlay from '../../components/LoaderOverlay';
import styles from './show-list-page.module.css';

export default function ShowListPage() {
    const {
        search,
        changeSearch,
        selectedGenres,
        changeSelectedGenres,
        resetFilter,
        isLoading,
        shows,
        pageShows,
        activePage,
        pagesCount,
        changeActivePage,
    } = usePresenter();

    return (
        <div className={ styles.page }>
            <ShowsFilter
                shows={ shows }
                search={ search }
                onChangeSearch={ changeSearch }
                selectedGenres={ selectedGenres }
                onChangeSelectedGenres={ changeSelectedGenres }
                resetFilter={ resetFilter }
            />
            {
                shows.length > 0 &&
                <div className={ styles.body }>
                    <ul className={ styles.showList }>
                        {
                            pageShows.map((show) => (
                                <li key={ show.id }>
                                    <ShowCard show={ show } />
                                </li>
                            ))
                        }
                    </ul>
                    {
                        isLoading &&
                        <LoaderOverlay />
                    }
                </div>
            }
            {
                shows.length === 0 &&
                isLoading &&
                <div className={ styles.body }>
                    <ul className={ styles.showList }>
                        {
                            [1, 2, 3].map((item) => (
                                <li key={ item }>
                                    <ShowCardSkeleton />
                                </li>
                            ))
                        }
                    </ul>
                </div>
            }
            <Pagination
                className={ styles.pagination }
                activePage={ activePage }
                pagesCount={ pagesCount }
                onChangeActivePage={ changeActivePage }
            />
        </div>
    );
}
