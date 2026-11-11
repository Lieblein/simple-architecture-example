import classNames from '../../../../classNames';
import { type IShow } from '../../types';
import GenreMultipleSelect from './components/GenreMultipleSelect';
import styles from './shows-filter.module.css';

interface IProps {
    className?: string;
    shows: IShow[];
    selectedGenres: string[];
    onChangeSelectedGenres: (selectedGenres: string[]) => void;
}

export default function ShowsFilter(props: Readonly<IProps>) {
    const {
        className,
        shows,
        selectedGenres,
        onChangeSelectedGenres,
    } = props;

    return (
        <div className={ classNames(className, styles.filter) }>
            <div>
                TODO: search input
            </div>
            <GenreMultipleSelect
                shows={ shows }
                value={ selectedGenres }
                onChange={ onChangeSelectedGenres }
            />
        </div>
    );
}
