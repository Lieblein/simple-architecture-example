export default (fileName, stylePathName) => `import React from 'react';
import classNames from 'classnames';

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