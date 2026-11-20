import { type INotification, type NotificationType } from '@ui/notification';
import useNotificationStore from '../store/notificationStore';

function* idGenerator() {
    let id = 0;
    while (true) {
        yield id++;
    }
    return 0;
}

const getNextId = idGenerator();

const AUTO_HIDE_TIMEOUT = 3 * 1000;

export default function addNotification(message: string, type: NotificationType): INotification {
    const id = getNextId.next().value;
    const notification: INotification = { id, message, type };
    useNotificationStore.getState().setNotification(notification);
    autoHideNotification(id);

    return notification;
}

function autoHideNotification(id: number) {
    setTimeout(
        () => {
            useNotificationStore.getState().removeNotification(id);
        },
        AUTO_HIDE_TIMEOUT,
    );
}
