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
        <div
            className={ classNames(className, styles.card) }
            style={{ borderRadius: borderRadius }}
        >
            <div className={ styles.header }>
                <h4 className={ styles.name }>
                    { name }
                </h4>
            </div>
            <div className={ styles['image-container'] }>
                {
                    image &&
                    <>
                        <img
                            className={ styles.image }
                            src={ image.original }
                            alt={ name }
                        />
                        <div className={ styles.overlay } />
                    </>
                }
            </div>
            <div className={ styles.footer }>
                {
                    genres.map((genre) => (
                        <div
                            key={ genre }
                            className={ styles.genre }
                        >
                            { genre }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
