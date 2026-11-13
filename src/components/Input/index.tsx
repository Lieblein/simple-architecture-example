import classNames from '@utils/classNames';
import styles from './input.module.css';

export interface IInputProps<Name extends string> extends Omit<React.ButtonHTMLAttributes<HTMLInputElement>, 'onChange'> {
    value: string;
    name: Name;
    onChange?: (value: string, name: Name) => void;
    placeholder: string;
}

export default function Input<Name extends string>(props: Readonly<IInputProps<Name>>) {
    const {
        className,
        type = 'text',
        onChange,
        ...rest
    } = props;

    const change = (event:  React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(event.target.value, props.name);
    };

    return (
        <input
            { ...rest }
            className={ classNames(className, styles.input) }
            type={ type }
            onChange={ change }
        />
    );
}
