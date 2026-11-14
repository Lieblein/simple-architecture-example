import classNames from '@utils/classNames';
import Notification from '../Notification';
import usePresenter from './logic/usePresenter';
import styles from './notifications.module.css';

export default function Notifications({ className }: { className?: string; }) {
    const { notifications } = usePresenter();

    if (notifications.length === 0) {
        return null;
    }

    return (
        <div className={ classNames(className, styles.container) }>
            {
                notifications.map((notification) => (
                    <Notification
                        key={ notification.id }
                        notification={ notification }
                    />
                ))
            }
        </div>
    );
}
