import { useEffect, useMemo, useState } from 'react';
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

        const response = await sendRequest<Array<{ score: number; show: IShow; }>>(
            'GET',
            `https://api.tvmaze.com/search/shows?q=${search}`, // `/api/search/shows?q=${search}`,
        );
        const shows = response.map(({ show }) => show);
        setShows(shows);
    };

    // TODO: убрать, тут только для теста
    useEffect(
        () => {
            changeSearch('of');
        },
        [],
    );

    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const changeSelectedGenres = (genres: string[]) => {
        setSelectedGenres(genres);
        setActivePage(1);
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

    return {
        search,
        changeSearch,
        selectedGenres,
        changeSelectedGenres,
        activePage,
        pagesCount: getPagesCount(filteredShows, ITEMS_PER_PAGE),
        changeActivePage: setActivePage,
        shows,
        filteredShows,
        pageShows,
    };
}
