import { useEffect, useState } from 'react';
import { type IShow } from './types';
import { sendRequest } from './request';

export default function usePresenter() {
    const [search, setSearch] = useState('');
    const [shows, setShows] = useState<IShow[]>([]);

    const changeSearch = async(search: string) => {
        setSearch(search);

        const shows = await sendRequest<IShow[]>('GET', '/api/search/shows', { q: search });
        setShows(shows);
    };

    // TODO: убрать, тут только для теста
    useEffect(
        () => {
            changeSearch('bill');
        },
        [],
    );

    return {
        search,
        changeSearch,
        shows,
    };
}
