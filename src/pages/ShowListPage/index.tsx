import React from 'react';
import classNames from 'classnames';

import usePresenter from './usePresenter';
import styles from './show-list-page.module.css';

export default function ShowListPage() {
    const {} = usePresenter();

    return (
        <div className={ styles.page }>
            ShowListPage
        </div>
    );
}
