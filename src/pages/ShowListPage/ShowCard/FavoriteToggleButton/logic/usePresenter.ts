import useFavoritesStore from '@store/favoritesStore';
import { useShallow } from 'zustand/shallow';
import { type IProps } from '../types';

export default function usePresenter(props: Readonly<IProps>) {
    const { showId } = props;
    const {
        isFavorite,
        toggleShowFavorite,
    } = useFavoritesStore(
        useShallow(({
            favoriteShows,
            toggleShowFavorite,
        }) => ({
            isFavorite: favoriteShows.has(showId),
            toggleShowFavorite,
        })),
    );

    // TODO: блокировка и прелоадер
    const click = () => toggleShowFavorite(showId, !isFavorite);

    return {
        isFavorite,
        click,
    };
}