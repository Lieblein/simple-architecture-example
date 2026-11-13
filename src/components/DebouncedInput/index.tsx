import Input from '@components/Input';
import usePresenter from './usePresenter';
import { type IProps } from './types';

export default function DebouncedInput<Name extends string>(props: Readonly<IProps<Name>>) {
    const { value, change } = usePresenter(props);

    return (
        <Input
            { ...props }
            value={ value }
            onChange={ change }
        />
    );
}
