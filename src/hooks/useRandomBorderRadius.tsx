import { useEffect, useState } from 'react';
import random from 'lodash/random';
import useBorderRadius from '../pages/ShowListPage/useBorderRadius';

const ID_MIN = 1;
const ID_MAX = 10000;
const TIMEOUT = 500;

export default function useRandomBorderRadius(min: number, max: number) {
    const [id, setId] = useState(() => random(ID_MIN, ID_MAX));

    useEffect(
        () => {
            const timer = setInterval(
                () => setId(random(ID_MIN, ID_MAX)),
                TIMEOUT,
            );

            return () => {
                clearInterval(timer);
            };
        },
        [],
    );

    return useBorderRadius(id, min, max);
}
