import classNames from '../../classNames';
import styles from './input.module.css';

interface IProps extends React.ButtonHTMLAttributes<HTMLInputElement> {
    placeholder: string;
}

export default function Input(props: Readonly<IProps>) {
    const {
        className,
        type = 'text',
        ...rest
    } = props;

    return (
        <input
            { ...rest }
            className={ classNames(className, styles.input) }
            type={ type }
        />
    );
}
