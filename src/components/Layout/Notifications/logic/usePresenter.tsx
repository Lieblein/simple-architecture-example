import { useNotificationStore } from '@store/notificationStore';
import { useMemo } from 'react';

export default function usePresenter() {
    const notificationMap = useNotificationStore((state) => state.notifications);
    const notifications = useMemo(
        () => Array.from(notificationMap.values()),
        [notificationMap],
    );

    return { notifications };
}