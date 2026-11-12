import classNames from '../../../../classNames';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import { type IShow } from '../../types';
import GenreMultipleSelect from './components/GenreMultipleSelect';
import styles from './shows-filter.module.css';

interface IProps {
    className?: string;
    shows: IShow[];
    search: string;
    onChangeSearch: (search: string) => void;
    selectedGenres: string[];
    onChangeSelectedGenres: (selectedGenres: string[]) => void;
    resetFilter: () => void;
}

export default function ShowsFilter(props: Readonly<IProps>) {
    const {
        className,
        shows,
        search,
        onChangeSearch,
        selectedGenres,
        onChangeSelectedGenres,
        resetFilter,
    } = props;

    return (
        <div className={ classNames(className, styles.filter) }>
            <div className={ styles.firstLine }>
                <Input
                    className={ styles.search }
                    name='search'
                    value={ search }
                    onChange={ (event) => onChangeSearch(event.target.value) }
                    placeholder='поиск...'
                />
                <Button onClick={ resetFilter }>
                    очистить фильтр
                </Button>
            </div>
            <GenreMultipleSelect
                shows={ shows }
                value={ selectedGenres }
                onChange={ onChangeSelectedGenres }
            />
        </div>
    );
}
