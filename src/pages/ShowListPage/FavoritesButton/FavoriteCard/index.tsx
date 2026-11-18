import { useState } from 'react';
import classNames from '@utils/classNames';
import { type IProps } from './types';
import styles from './favorite-card.module.css';

export default function FavoriteCard(props: Readonly<IProps>) {
    const { className, show } = props;
    const { name, image } = show;
    const [imageError, setImageError] = useState(false);

    return (
        <div className={ classNames(className, styles.card) }>
            {
                image && !imageError
                  ? <img
                      className={ styles.image }
                      src={ image.original }
                      alt={ name }
                      onError={ () => setImageError(true) }
                    />
                  : <div className={ styles.placeholder }>?</div>
            }
            <span className={ styles.name }>
                { name }
            </span>
        </div>
    );
}