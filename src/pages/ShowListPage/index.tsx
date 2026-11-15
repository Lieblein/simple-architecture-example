import Pagination from '@components/Pagination';
import LoaderOverlay from '@components/LoaderOverlay';
import ShowCard from './ShowCard';
import ShowsFilter from './ShowsFilter';
import ShowCardSkeleton from './ShowCardSkeleton';
import FavoritesButton from './FavoritesButton';
import usePresenter from './logic/usePresenter';
import styles from './show-list-page.module.css';

export default function ShowListPage() {
    const {
        pagination,
        isLoading,
        changeActivePage,
        pageShows,
    } = usePresenter();

    return (
        <div className={ styles.page }>
            <FavoritesButton />
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
                pagination={ pagination }
                onChangeActivePage={ changeActivePage }
            />
        </div>
    );
}
