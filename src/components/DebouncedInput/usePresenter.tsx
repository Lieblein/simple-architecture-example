import { useEffect, useState } from 'react';
import { type IProps } from './types';

export default function usePresenter<Name extends string>(props: Readonly<IProps<Name>>) {
    const {
        onChange,
        name,
        debounceTimeout,
    } = props;

    const [value, setValue] = useState(props.value);
    useEffect(
        () => {
            if (props.value !== value) {
                setValue(props.value);
            }
        },
        [props.value]
    );

    const change = (value: string) => {
        setValue(value);
    };

    useEffect(
        () => {
            if (!onChange) {
                return;
            }

            const timeout = setTimeout(() => onChange(value, name), debounceTimeout);

            return () => clearTimeout(timeout);
        },
        [
            value,
            onChange,
            name,
            debounceTimeout,
        ],
    );


    return {
        value,
        change,
    };
}
