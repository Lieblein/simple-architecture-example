import classNames from '@utils/classNames';
import Button from '@components/Button';
import Input from '@components/Input';
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
        onReset,
    } = usePresenter();

    return (
        <div className={ classNames(className, styles.root) }>
            <div className={ styles.filter }>
                <div className={ styles.firstLine }>
                    <Input
                        className={ styles.search }
                        name='search'
                        value={ filter.search }
                        onChange={ onChangeSearch }
                        placeholder='поиск...'
                    />
                    <Button onClick={ onReset }>
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
