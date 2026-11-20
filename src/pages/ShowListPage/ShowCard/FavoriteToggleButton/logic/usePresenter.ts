import useFavoritesStore from '@store/favoritesStore';
import toggleFavorite from './tasks/toggleFavorite';
import { type IProps } from '../types';

export default function usePresenter(props: Readonly<IProps>) {
    const { show } = props;

    const isFavorite = useFavoritesStore(({ favoriteShows }) => favoriteShows.has(show.id));

    const onClick = () => {
        // TODO: isFetching + circular loader
        toggleFavorite(show, !isFavorite);
    };

    return {
        isFavorite,
        onClick,
    };
}
