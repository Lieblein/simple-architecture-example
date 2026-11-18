import { type IShow } from '@api/show';
import useNotificationStore from '@store/notificationStore';
import sendRequest from './sendRequest';

export default async function toggleFavorite(show: IShow, newIsFavorite: boolean) {
    try {
        const method = newIsFavorite ? 'POST' : 'DELETE';
        await sendRequest(
            method,
            `/api/favorite/${show.id}`,
            newIsFavorite ? show : undefined,
        );

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
