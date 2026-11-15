import useRandomBorderRadius from '@hooks/useRandomBorderRadius';

const MIN = 4;
const MAX = 20;

export default function usePresenter() {
    const borderRadius1 = useRandomBorderRadius(MIN, MAX);
    const borderRadius2 = useRandomBorderRadius(MIN, MAX);
    const borderRadius3 = useRandomBorderRadius(MIN, MAX);

    return { borderRadiusArray: [borderRadius1, borderRadius2, borderRadius3] };
}
