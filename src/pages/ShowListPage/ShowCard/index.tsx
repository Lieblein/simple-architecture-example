import classNames from '@utils/classNames';
import FavoriteToggleButton from './FavoriteToggleButton';
import usePresenter from './logic/usePresenter';
import styles from './show-card.module.css';
import { type IProps } from './types';

export default function ShowCard(props: Readonly<IProps>) {
    const { className, show } = props;
    const {
        name,
        image,
        genres,
    } = show;

    const {
        borderRadius,
    } = usePresenter(props);

    return (
        <div
            className={ classNames(className, styles.card) }
            style={{ borderRadius: borderRadius }}
        >
            <div className={ styles.header }>
                <h4 className={ styles.name }>
                    { name.toLowerCase() }
                </h4>
                <FavoriteToggleButton
                    showId={ show.id }
                />
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
