import { useMemo } from 'react';

import { type IProps } from './types';

export default function usePresenter(props: Readonly<IProps>) {
    const { shows, value, onChange } = props;

    const options = useMemo(
        () => {
            const options = new Set(value);

            shows.forEach(({ genres }) => {
                genres.forEach((genre) => options.add(genre));
            });

            return Array.from(options).sort();
        },
        [value, shows],
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
