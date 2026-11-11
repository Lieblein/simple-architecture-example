import { type IShow } from '../../../../types';

export interface IProps {
    className?: string;
    shows: IShow[];
    value: string[];
    onChange: (value: string[]) => void;
}
