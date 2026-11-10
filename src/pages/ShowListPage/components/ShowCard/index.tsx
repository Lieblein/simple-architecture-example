import React from 'react';

import classNames from '../../../../classNames';
import { type IShow } from '../../types';
import styles from './show-card.module.css';
import useBorderRadius from './useBorderRadius';

interface IProps {
    className?: string;
    show: IShow;
}

export default function ShowCard(props: Readonly<IProps>) {
    const { className, show } = props;
    const {
        id,
        name,
        image,
        genres,
    } = show;

    const borderRadius = useBorderRadius(id);

    return (
        <figure
            className={ classNames(className, styles.card) }
            style={{ borderRadius: borderRadius }}
        >
            {
                image &&
                <img
                    className={ styles.image }
                    style={{ clipPath: `inset(0 round ${borderRadius})` }}
                    src={ image.original }
                    alt={ name }
                />
            }
            <div className={ styles.overlay } />
            <figcaption className={ styles.data }>
                <div className={ styles.header }>
                    <h4 className={ styles.name }>
                        { name }
                    </h4>
                </div>
            </figcaption>
        </figure>
    );
}
