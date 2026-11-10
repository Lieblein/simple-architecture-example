export default (fileName, stylePathName) => `import React from 'react';
import classNames from 'classnames';

import { type IProps } from './types';
import usePresenter from './usePresenter';
import styles from './${stylePathName}';

export default function ${fileName}(props: Readonly<IProps>) {
    const { className } = props;
    const {} = usePresenter();

    return (
        <div className={ className }>
            ${fileName}
        </div>
    );
}
`;