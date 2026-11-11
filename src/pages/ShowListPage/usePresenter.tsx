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

        const response = await sendRequest<Array<{ score: number; show: IShow; }>>(
            'GET',
            `/api/search/shows?q=${search}`,
        );
        const shows = response.map(({ show }) => show);
        setShows(shows);
    };

    // TODO: убрать, тут только для теста
    useEffect(
        () => {
            changeSearch('');
        },
        [],
    );

    const [activePage, setActivePage] = useState(1);
    const pageShows = useMemo(
        () => getListForPage(shows, activePage, ITEMS_PER_PAGE),
        [shows, activePage],
    );

    return {
        search,
        changeSearch,
        activePage,
        pagesCount: getPagesCount(shows, ITEMS_PER_PAGE),
        changeActivePage: setActivePage,
        shows,
        pageShows,
    };
}
