import useFavoritesStore from '@store/favoritesStore';
import { useShallow } from 'zustand/shallow';
import { type IProps } from '../types';

export default function usePresenter(props: Readonly<IProps>) {
    const { show } = props;

    const {
        isFavorite,
        toggleShowFavorite,
    } = useFavoritesStore(
        useShallow(({
            favoriteShows,
            toggleShowFavorite,
        }) => ({
            isFavorite: favoriteShows.has(show.id),
            toggleShowFavorite,
        })),
    );

    const click = () => {
        toggleShowFavorite(show, !isFavorite);
    };

    return {
        isFavorite,
        click,
    };
}