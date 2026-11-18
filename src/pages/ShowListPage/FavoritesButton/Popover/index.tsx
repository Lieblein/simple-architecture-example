import classNames from '@utils/classNames';
import usePresenter from './logic/usePresenter';
import { type IProps } from './types';
import styles from './popover.module.css';

export default function Popover(props: Readonly<IProps>) {
    const { className, open, children, onClose } = props;
    const { position, popoverRef } = usePresenter(props);

    return (
        <>
            {
                open &&
                <div
                    className={ styles.overlay }
                    onClick={ onClose }
                />
            }
            <div
                className={
                    classNames(
                        className,
                        styles.popover,
                        position ? styles[position.position] : undefined,
                        { [styles.open]: open },
                    )
                }
                style={ position ? { top: position.top, left: position.left } : undefined }
                ref={ popoverRef }
            >
                { children }
            </div>
        </>
    );
}