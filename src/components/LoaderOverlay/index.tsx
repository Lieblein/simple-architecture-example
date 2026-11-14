import classNames from '@utils/classNames';
import usePresenter from './logic/usePresenter';
import styles from './loader-overlay.module.css';

interface IProps {
    className?: string;
}

export default function LoaderOverlay(props: Readonly<IProps>) {
    const { className } = props;
    const { borderRadiusArray } = usePresenter();

    return (
        <div className={ classNames(className, styles.overlay) }>
            <div className={ styles.list }>
                {
                    borderRadiusArray.map((borderRadius, index) => (
                        <div
                            key={ index }
                            className={ styles.item }
                            style={{ borderRadius: borderRadius }}
                        />
                    ))
                }
            </div>
        </div>
    );
}
