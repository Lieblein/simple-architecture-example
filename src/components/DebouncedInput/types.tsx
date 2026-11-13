import { type IInputProps } from '@components/Input';

export interface IProps<Name extends string> extends IInputProps<Name> {
    debounceTimeout: number;
}
