import { useShallow } from 'zustand/shallow';
import classNames from '@utils/classNames';
import Button from '@components/Button';
import DebouncedInput from '@components/DebouncedInput';
import { useShowListStore } from '@store/showListStore';
import GenreMultipleSelect from './GenreMultipleSelect';
import styles from './shows-filter.module.css';

interface IProps {
    className?: string;
}

export default function ShowsFilter({ className }: IProps) {
    const {
        search,
        changeSearch,
        selectedGenres,
        changeSelectedGenres,
        resetFilter,
    } = useShowListStore(
        useShallow(({
            search,
            changeSearch,
            selectedGenres,
            changeSelectedGenres,
            resetFilter,
        }) => ({
            search,
            changeSearch,
            selectedGenres,
            changeSelectedGenres,
            resetFilter,
        })),
    );

    return (
        <div className={ classNames(className, styles.root) }>
            <div className={ styles.filter }>
                <div className={ styles.firstLine }>
                    <DebouncedInput
                        className={ styles.search }
                        name='search'
                        value={ search }
                        onChange={ changeSearch }
                        debounceTimeout={ 200 }
                        placeholder='поиск...'
                    />
                    <Button onClick={ resetFilter }>
                        очистить фильтр
                    </Button>
                </div>
                <GenreMultipleSelect
                    value={ selectedGenres }
                    onChange={ changeSelectedGenres }
                />
            </div>
        </div>
    );
}