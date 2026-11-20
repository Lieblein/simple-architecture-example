import classNames from '@utils/classNames';
import Button from '@components/Button';
import DebouncedInput from '@components/DebouncedInput';
import usePresenter from './logic/usePresenter';
import GenreMultipleSelect from './GenreMultipleSelect';
import styles from './shows-filter.module.css';

interface IProps {
    className?: string;
}

export default function ShowsFilter({ className }: IProps) {
    const {
        filter,
        onChangeSearch,
        onChangeSelectedGenres,
        reset,
    } = usePresenter();

    return (
        <div className={ classNames(className, styles.root) }>
            <div className={ styles.filter }>
                <div className={ styles.firstLine }>
                    <DebouncedInput
                        className={ styles.search }
                        name='search'
                        value={ filter.search }
                        onChange={ onChangeSearch }
                        debounceTimeout={ 200 }
                        placeholder='поиск...'
                    />
                    <Button onClick={ reset }>
                        очистить фильтр
                    </Button>
                </div>
                <GenreMultipleSelect
                    value={ filter.selectedGenres }
                    onChange={ onChangeSelectedGenres }
                />
            </div>
        </div>
    );
}
