import classNames from '../../../../classNames';
import { useNotificationStore } from '../../../../store/notificationStore';
import Notification from '../Notification';
import styles from './notifications.module.css';

export default function Notifications({ className }: { className?: string; }) {
    const notifications = useNotificationStore((state) => state.notifications);

    if (notifications.size === 0) {
        return null;
    }

    return (
        <div className={ classNames(className, styles.container) }>
            {
                Array.from(notifications.values()).map((notification) => (
                    <Notification
                        key={ notification.id }
                        notification={ notification }
                    />
                ))
            }
        </div>
    );
}
