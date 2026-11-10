export default (fileName, stylePathName) => `import React from 'react';
import classNames from 'classnames';

import { type IProps } from './types';
import styles from './${stylePathName}';

export default function ${fileName}(props: Readonly<IProps>) {
    const { className } = props;

    return (
        <div className={ className }>
            ${fileName}
        </div>
    );
}
`;