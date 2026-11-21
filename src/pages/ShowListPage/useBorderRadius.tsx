import { useMemo } from 'react';
import { calculateBorderRadius } from '@tasks/borderRadius';

export default function useBorderRadius(id: number, min: number, max: number) {
    return useMemo(
        () => calculateBorderRadius(id, min, max),
        [id, min, max],
    );
}
