import classNames from '../../utils/classNames';
import styles from './button.module.css';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}

export default function Button(props: Readonly<IProps>) {
    const {
        className,
        type = 'button',
        children,
        ...rest
    } = props;

    return (
        <button
            { ...rest }
            className={ classNames(className, styles.button) }
        >
            { children }
        </button>
    );
}
