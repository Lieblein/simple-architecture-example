export default (fileName, stylePathName) => `import classNames from '@utils/classNames';
import styles from './${stylePathName}';

interface IProps {
    className?: string;
}

export default function ${fileName}(props: Readonly<IProps>) {
    const { className } = props;

    return (
        <div className={ className }>
            ${fileName}
        </div>
    );
}
`;