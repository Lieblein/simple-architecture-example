import { useMemo, useState } from 'react';
import { type IShow } from './types';
import { sendRequest } from './request';
import {
    getListForPage,
    getPagesCount,
} from './pagination';

const ITEMS_PER_PAGE = 3;

export default function usePresenter() {
    const [search, setSearch] = useState('');
    const [shows, setShows] = useState<IShow[]>([]);

    const changeSearch = async(search: string) => {
        setSearch(search);
        setActivePage(1);

        if (search.trim() === '') {
            setShows([]);
            return;
        }

        const response = await sendRequest<Array<{ score: number; show: IShow; }>>(
            'GET',
            `/api/search/shows?q=${search.trim()}`, // `https://api.tvmaze.com/search/shows?q=${search}`
        );
        const shows = response.map(({ show }) => show);
        setShows(shows);
    };

    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const changeSelectedGenres = (genres: string[]) => {
        setSelectedGenres(genres);
        setActivePage(1);
    };

    const resetFilter = () => {
        setSearch('');
        setSelectedGenres([]);
        setActivePage(1);
        setShows([]);
    };

    const filteredShows = useMemo(
        () => shows.filter(({ genres }) =>
            selectedGenres.length === 0 ||
            selectedGenres.some((selectedGenre) => genres.includes(selectedGenre)),
        ),
        [selectedGenres, shows],
    );

    const [activePage, setActivePage] = useState(1);
    const pageShows = useMemo(
        () => getListForPage(filteredShows, activePage, ITEMS_PER_PAGE),
        [filteredShows, activePage],
    );

    // TODO: много пробрасываний пропсов через компоненты, нужен стейт менеджер
    return {
        search,
        changeSearch,
        selectedGenres,
        changeSelectedGenres,
        resetFilter,
        activePage,
        pagesCount: getPagesCount(filteredShows, ITEMS_PER_PAGE),
        changeActivePage: setActivePage,
        shows,
        filteredShows,
        pageShows,
    };
}
