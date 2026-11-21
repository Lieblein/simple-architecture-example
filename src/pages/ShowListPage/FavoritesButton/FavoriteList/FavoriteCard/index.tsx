import classNames from '@utils/classNames';
import { type IProps } from './types';
import usePresenter from './logic/usePresenter';
import styles from './favorite-card.module.css';

export default function FavoriteCard(props: Readonly<IProps>) {
    const { className, show: { name, image } } = props;
    const { imageError, onImageError } = usePresenter(props);

    return (
        <div className={ classNames(className, styles.card) }>
            {
                image && !imageError
                  ? <img
                      className={ styles.image }
                      src={ image.original }
                      alt={ name }
                      onError={ onImageError }
                    />
                  : <div className={ styles.placeholder }>?</div>
            }
            <span className={ styles.name }>
                { name }
            </span>
        </div>
    );
}