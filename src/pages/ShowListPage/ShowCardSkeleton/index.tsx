import classNames from '@utils/classNames';
import usePresenter from './logic/usePresenter';
import styles from './show-card-skeleton.module.css';

interface IProps {
    className?: string;
}

export default function ShowCardSkeleton(props: Readonly<IProps>) {
    const { className } = props;
    const { borderRadius } = usePresenter();

    return (
        <div
            className={ classNames(className, styles.skeleton) }
            style={{ borderRadius: borderRadius }}
        />
    );
}
