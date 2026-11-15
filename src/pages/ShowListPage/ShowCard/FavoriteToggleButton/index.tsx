import classNames from '@utils/classNames';
import StarIcon from '../../components/StarIcon';
import usePresenter from './logic/usePresenter';
import { type IProps } from './types';
import styles from './favorite-toggle-button.module.css';

export default function FavoriteToggleButton(props: Readonly<IProps>) {
    const { className } = props;
    const {
        isFavorite,
        click,
    } = usePresenter(props);

    // TODO: круглая кликабельная зона
    return (
        <button
            className={ classNames(className, styles.button) }
            onClick={ click }
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
