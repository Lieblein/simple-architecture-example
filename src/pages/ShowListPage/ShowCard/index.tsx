import classNames from '@utils/classNames';
import { type IShow } from '@api/show';
import usePresenter from './logic/usePresenter';
import styles from './show-card.module.css';

interface IProps {
    className?: string;
    show: IShow;
}

export default function ShowCard(props: Readonly<IProps>) {
    const { className, show } = props;
    const {
        name,
        image,
        genres,
    } = show;

    const { borderRadius } = usePresenter(show);

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
