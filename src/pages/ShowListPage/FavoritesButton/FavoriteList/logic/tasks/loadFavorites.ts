import { type IShow } from '@api/show';
import useFavoritesStore from '@store/favoritesStore';
import addNotification from '@tasks/addNotification';
import sendRequest from '@tasks/sendRequest';

export default async function loadFavorites() {
    try {
        const favorites = await sendRequest<IShow[]>('GET', '/api/favorite');

        const favoriteShows = new Map(favorites.map((show) => [show.id, show]));
        useFavoritesStore.getState().setFavorites(favoriteShows);

        return favorites;
    } catch (error) {
        addNotification('Ошибка при загрузке избранного', 'error');
        return [];
    }
}
