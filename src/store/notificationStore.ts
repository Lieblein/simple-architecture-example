import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { enableMapSet } from 'immer';

enableMapSet();

export interface INotification {
    id: number;
    message: string;
    type: 'error';
}

interface INotificationState {
    notifications: Map<number, INotification>;
}

interface INotificationActions {
    addNotification: (message: string, type: 'error') => void;
    removeNotification: (id: number) => void;
}

type NotificationStore = INotificationState & INotificationActions;

function* idGenerator() {
    let id = 0;
    while (true) {
        yield id++;
    }

    return 0;
}

const getNextId = idGenerator();

export const useNotificationStore = create<NotificationStore>()(
    immer((set) => ({
        notifications: new Map<number, INotification>(),

        addNotification: (message: string, type: 'error') => {
            const id = getNextId.next().value;
            set((state) => {
                state.notifications.set(id, { id, message, type });
            });

            setTimeout(
                () => {
                    set((state) => {
                        state.notifications.delete(id);
                    });
                },
                3000,
            );
        },

        removeNotification: (id: number) => {
            set((state) => {
                state.notifications.delete(id);
            });
        },
    })),
);
