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

const HIDE_TIMEOUT = 3 * 1000;

export interface IAddNotificationParams {
    message: string;
    type: NotificationType;
}

export function addNotification({ message, type }: IAddNotificationParams): INotification {
    const id = getNextId.next().value;
    const notification: INotification = { id, message, type };

    setTimeout(
        () => {
            useNotificationStore.getState().removeNotification(id);
        },
        HIDE_TIMEOUT,
    );

    return notification;
}
