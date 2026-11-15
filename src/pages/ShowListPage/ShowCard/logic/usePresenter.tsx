import { calculateBorderRadius } from '@utils/borderRadius';
import { IProps } from '../types';

const MIN = 20;
const MAX = 100;

export default function usePresenter({ show }: IProps) {
    const borderRadius = calculateBorderRadius(show.id, MIN, MAX);

    return {
        borderRadius,
    };
}
