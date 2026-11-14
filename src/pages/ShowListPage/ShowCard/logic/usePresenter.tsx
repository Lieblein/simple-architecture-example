import { type IShow } from '@api/show';
import { calculateBorderRadius } from '@utils/borderRadius';

const MIN = 20;
const MAX = 100;

export default function usePresenter(show: IShow) {
    const borderRadius = calculateBorderRadius(show.id, MIN, MAX);

    return { borderRadius };
}