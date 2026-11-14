import Pagination from '@components/Pagination';
import LoaderOverlay from '@components/LoaderOverlay';
import ShowCard from './ShowCard';
import ShowsFilter from './ShowsFilter';
import ShowCardSkeleton from './ShowCardSkeleton';
import usePresenter from './logic/usePresenter';
import styles from './show-list-page.module.css';

export default function ShowListPage() {
    const {
        activePage,
        isLoading,
        changeActivePage,
        pageShows,
        pagesCount,
    } = usePresenter();

    return (
        <div className={ styles.page }>
            <ShowsFilter />
            {
                pageShows.length > 0 &&
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
                pageShows.length === 0 &&
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