import classNames from '@utils/classNames';
import usePresenter from './logic/usePresenter';
import FavoriteCard from './FavoriteCard';
import { type IProps } from './types';
import styles from './favorite-list.module.css';

export default function FavoriteList(props: Readonly<IProps>) {
    const { className } = props;
    const { favoriteShows, isLoading } = usePresenter();

    return (
        <div className={ classNames(className, styles.list) }>
            {
                isLoading
                ? [1, 2, 3].map((item) => (<div key={ item } className={ styles.skeleton } />))
                : favoriteShows.map((show) => (
                    <FavoriteCard
                        key={ show.id }
                        show={ show }
                    />
                ))
            }
        </div>
    );
}