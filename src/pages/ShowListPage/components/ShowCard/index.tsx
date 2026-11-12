import classNames from '../../../../classNames';
import { type IShow } from '../../types';
import useBorderRadius from '../../useBorderRadius';
import styles from './show-card.module.css';

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

    const borderRadius = useBorderRadius(id, 20, 100);

    return (
        <div
            className={ classNames(className, styles.card) }
            style={{ borderRadius: borderRadius }}
        >
            <div className={ styles.header }>
                <h4 className={ styles.name }>
                    { name.toLowerCase() }
                </h4>
            </div>
            <div className={ styles.imageContainer }>
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
                            { genre.toLowerCase() }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
