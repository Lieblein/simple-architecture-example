import { useEffect, useState } from 'react';
import { type IShow } from './types';
import { sendRequest } from './request';

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

    return {
        search,
        changeSearch,
        shows,
    };
}
