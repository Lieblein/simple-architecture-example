import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { type INotification } from '@ui/notification';

interface INotificationState {
    notifications: Map<number, INotification>;
}

interface INotificationActions {
    setNotification: (notification: INotification) => void;
    removeNotification: (id: number) => void;
}

type NotificationStore = INotificationState & INotificationActions;

const useNotificationStore = create<NotificationStore>()(
    immer((set) => ({
        notifications: new Map<number, INotification>(),

        setNotification: (notification: INotification) => {
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
