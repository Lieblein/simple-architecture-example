import React from 'react';
import classNames from 'classnames';

import styles from './layout.module.css';

interface IProps {
    className?: string;
    children: React.ReactNode;
}

export default function Layout(props: Readonly<IProps>) {
    const { className, children } = props;

    return (
        <div className={ classNames(className, styles.layout) }>
            { children }
        </div>
    );
}
