import useNotificationStore from '@store/notificationStore';
import sendRequest from './sendRequest';

export default async function toggleFavorite(showId: number, newIsFavorite: boolean) {
    try {
        const method = newIsFavorite ? 'POST' : 'DELETE';
        await sendRequest(method, `/api/favorite/${showId}`);

        useNotificationStore.getState().addNotification(
            newIsFavorite
                ? 'Добавлено в избранное'
                : 'Удалено из избранного',
            'success'
        );
    } catch (error) {
        useNotificationStore.getState().addNotification('Ошибка при обновлении избранного', 'error');
        throw error;
    }
}
