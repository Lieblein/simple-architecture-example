import classNames from '@utils/classNames';
import { INotification, useNotificationStore } from '@store/notificationStore';
import styles from './notification.module.css';

interface IProps {
    className?: string;
    notification: INotification;
}

export default function Notification(props: Readonly<IProps>) {
    const { className, notification: { id, message, type } } = props;
    const removeNotification = useNotificationStore((state) => state.removeNotification);

    return (
        <div className={ classNames(className, styles.notification, styles[type]) }>
            <div className={ styles.message }>
                { message }
            </div>
            <button
                className={ styles.closeButton }
                onClick={ () => removeNotification(id) }
                type='button'
            >
                ×
            </button>
        </div>
    );
}