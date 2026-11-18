import classNames from '@utils/classNames';
import usePresenter from './logic/usePresenter';
import FavoriteCard from './FavoriteCard';
import { type IProps } from './types';
import styles from './favorite-list.module.css';

export default function FavoriteList(props: Readonly<IProps>) {
    const { className } = props;
    const { favoriteShows } = usePresenter();

    return (
        <div className={ classNames(className, styles.list) }>
            {
                favoriteShows.map((show) => (
                    <FavoriteCard
                        key={ show.id }
                        show={ show }
                    />
                ))
            }
        </div>
    );
}