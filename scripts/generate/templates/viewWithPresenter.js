export default (fileName, stylePathName) => `import classNames from '@utils/classNames';
import { type IProps } from './types';
import usePresenter from './usePresenter';
import styles from './${stylePathName}';

export default function ${fileName}(props: Readonly<IProps>) {
    const { className } = props;
    const {} = usePresenter(props);

    return (
        <div className={ className }>
            ${fileName}
        </div>
    );
}
`;