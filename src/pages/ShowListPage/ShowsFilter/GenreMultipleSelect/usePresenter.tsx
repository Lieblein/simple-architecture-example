import { useMemo } from 'react';
import { useShowListStore } from '@store/showListStore';
import { type IProps } from './types';

export default function usePresenter(props: Readonly<IProps>) {
    const { value, onChange } = props;
    const availableGenres = useShowListStore(({ availableGenres }) => availableGenres);

    const options = useMemo(
        () => {
            const options = new Set(value.concat(availableGenres));

            return Array.from(options).sort();
        },
        [value, availableGenres],
    );

    const toggleOption = (option: string) => {
        const selected = value.includes(option);
        const newValue = selected
            ? value.filter((item) => item !== option)
            :value.concat(option);
        onChange(newValue);
    };

    return { options, toggleOption };
}
