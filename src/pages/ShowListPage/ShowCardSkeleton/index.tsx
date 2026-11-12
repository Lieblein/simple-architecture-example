import classNames from '../../../utils/classNames';
import useRandomBorderRadius from '../../../hooks/useRandomBorderRadius';
import styles from './show-card-skeleton.module.css';

interface IProps {
    className?: string;
}

export default function ShowCardSkeleton(props: Readonly<IProps>) {
    const { className } = props;

    const borderRadius = useRandomBorderRadius(20, 100);

    return (
        <div
            className={ classNames(className, styles.skeleton) }
            style={{ borderRadius: borderRadius }}
        />
    );
}
