import useRandomBorderRadius from '@hooks/useRandomBorderRadius';

const MIN = 20;
const MAX = 100;

export default function usePresenter() {
    const borderRadius = useRandomBorderRadius(MIN, MAX);

    return { borderRadius };
}