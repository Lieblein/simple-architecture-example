import React from 'react';

import classNames from '../../classNames';
import usePresenter from './usePresenter';
import ShowCard from './components/ShowCard';
import styles from './show-list-page.module.css';

export default function ShowListPage() {
    const {
        // search,
        // changeSearch,
        shows,
    } = usePresenter();

    return (
        <div className={ styles.page }>
            <ul className={ styles['show-list'] }>
                {
                    shows.map((show) => (
                        <li className={ styles['show-item'] }>
                            <ShowCard show={ show } />
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}
