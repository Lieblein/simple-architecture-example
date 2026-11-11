export interface IProps {
    className?: string;
    activePage: number;
    pagesCount: number;
    onChangeActivePage: (activePage: number) => void;
}
