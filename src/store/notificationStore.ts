import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { type INotification, type NotificationType } from '@ui/notification';
import { addNotification } from '../tasks/addNotification';

interface INotificationState {
    notifications: Map<number, INotification>;
}

interface INotificationActions {
    addNotification: (message: string, type: NotificationType) => void;
    removeNotification: (id: number) => void;
}

type NotificationStore = INotificationState & INotificationActions;

const useNotificationStore = create<NotificationStore>()(
    immer((set) => ({
        notifications: new Map<number, INotification>(),

        addNotification: (message: string, type: NotificationType) => {
            const notification = addNotification({ message, type });
            set((state) => {
                state.notifications.set(notification.id, notification);
            });
        },

        removeNotification: (id: number) => {
            set((state) => {
                state.notifications.delete(id);
            });
        },
    })),
);

export default useNotificationStore;
