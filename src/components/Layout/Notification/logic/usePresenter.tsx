import { useNotificationStore } from '@store/notificationStore';

export default function usePresenter(id: number) {
    const removeNotification = useNotificationStore((state) => state.removeNotification);

    return { removeNotification: () => removeNotification(id) };
}