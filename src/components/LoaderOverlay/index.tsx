import classNames from '@utils/classNames';
import useRandomBorderRadius from '@hooks/useRandomBorderRadius';
import styles from './loader-overlay.module.css';

const MIN = 4;
const MAX = 20;

interface IProps {
    className?: string;
}

export default function LoaderOverlay(props: Readonly<IProps>) {
    const { className } = props;

    const borderRadius1 = useRandomBorderRadius(MIN, MAX);
    const borderRadius2 = useRandomBorderRadius(MIN, MAX);
    const borderRadius3 = useRandomBorderRadius(MIN, MAX);

    return (
        <div className={ classNames(className, styles.overlay) }>
            <div className={ styles.list }>
                <div className={ styles.item } style={{ borderRadius: borderRadius1 }} />
                <div className={ styles.item } style={{ borderRadius: borderRadius2 }} />
                <div className={ styles.item } style={{ borderRadius: borderRadius3 }} />
            </div>
        </div>
    );
}
