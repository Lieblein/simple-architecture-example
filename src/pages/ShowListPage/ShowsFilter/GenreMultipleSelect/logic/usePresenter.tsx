import { useMemo } from 'react';
import useShowListStore from '@store/showListStore';
import { type IProps } from '../types';
import toggleGenre from './tasks/toggleGenre';
import { getOptions } from './tasks/getOptions';

export default function usePresenter(props: Readonly<IProps>) {
    const { value, onChange } = props;
    const availableGenres = useShowListStore(({ availableGenres }) => availableGenres);

    const options = useMemo(
        () => getOptions(availableGenres, value),
        [availableGenres, value],
    );

    const onClick = (genre: string) => {
        const newGenres = toggleGenre(genre, options);
        onChange(newGenres);
    };

    return { options, onClick };
}
