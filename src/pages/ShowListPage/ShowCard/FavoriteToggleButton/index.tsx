import classNames from '@utils/classNames';
import StarIcon from '../../components/StarIcon';
import usePresenter from './logic/usePresenter';
import { type IProps } from './types';
import styles from './favorite-toggle-button.module.css';

export default function FavoriteToggleButton(props: Readonly<IProps>) {
    const { className } = props;
    const {
        isFavorite,
        onClick,
    } = usePresenter(props);

    return (
        <button
            className={ classNames(className, styles.button) }
            onClick={ onClick }
            type='button'
            title={ isFavorite ? 'Удалить из избранного' : 'Добавить в избранное' }
        >
            <StarIcon
                variant={ isFavorite ? 'filled' : 'outlined' }
                size={ 28 }
            />
        </button>
    );
}
