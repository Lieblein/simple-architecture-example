import { type IShow } from '@api/show';
import useFavoritesStore from '@store/favoritesStore';
import addNotification from '@tasks/addNotification';
import sendRequest from '@tasks/sendRequest';

export default async function toggleFavorite(show: IShow, newIsFavorite: boolean) {
    try {
        const method = newIsFavorite ? 'POST' : 'DELETE';
        await sendRequest(
            method,
            `/api/favorite/${show.id}`,
            newIsFavorite ? show : undefined,
        );

        addNotification(
            newIsFavorite
                ? 'Добавлено в избранное'
                : 'Удалено из избранного',
            'success'
        );

        if (newIsFavorite) {
            useFavoritesStore.getState().addToFavorites(show);
        } else {
            useFavoritesStore.getState().deleteFromFavorites(show);
        }

        return newIsFavorite;
    } catch (error) {
        addNotification('Ошибка при обновлении избранного', 'error');
    }
}
