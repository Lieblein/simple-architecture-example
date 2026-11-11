import usePresenter from './usePresenter';
import ShowCard from './components/ShowCard';
import Pagination from './components/Pagination';
import ShowsFilter from './components/ShowsFilter';
import styles from './show-list-page.module.css';

export default function ShowListPage() {
    const {
        // search,
        // changeSearch,
        selectedGenres,
        changeSelectedGenres,
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
                selectedGenres={ selectedGenres }
                onChangeSelectedGenres={ changeSelectedGenres }
            />
            <ul className={ styles['show-list'] }>
                {
                    pageShows.map((show) => (
                        <li key={ show.id }>
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
