import classNames from '@utils/classNames';
import { type INotification } from '@ui/notification';
import usePresenter from './logic/usePresenter';
import styles from './notification.module.css';

interface IProps {
    className?: string;
    notification: INotification;
}

export default function Notification(props: Readonly<IProps>) {
    const { className, notification: { id, message, type } } = props;
    const { removeNotification } = usePresenter(id);

    return (
        <div className={ classNames(className, styles.notification, styles[type]) }>
            <div className={ styles.message }>
                { message }
            </div>
            <button
                className={ styles.closeButton }
                onClick={ removeNotification }
                type='button'
            >
                ×
            </button>
        </div>
    );
}