import { IPagination } from '@ui/pagination';

export interface IProps {
    className?: string;
    pagination: IPagination;
    onChangeActivePage: (activePage: number) => void;
}
