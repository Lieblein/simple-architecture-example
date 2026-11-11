import usePresenter from './usePresenter';
import ShowCard from './components/ShowCard';
import Pagination from './components/Pagination';
import styles from './show-list-page.module.css';

export default function ShowListPage() {
    const {
        // search,
        // changeSearch,
        pageShows,
        activePage,
        pagesCount,
        changeActivePage,
    } = usePresenter();

    return (
        <div className={ styles.page }>
            <ul className={ styles['show-list'] }>
                {
                    pageShows.map((show) => (
                        <li>
                            <ShowCard show={ show } />
                        </li>
                    ))
                }
            </ul>
            <Pagination
                className={ styles.pagination }
                activePage={ activePage }
                pagesCount={ pagesCount }
                onChangeActivePage={ changeActivePage }
            />
        </div>
    );
}
