import classNames from '@utils/classNames';
import { type IProps } from './types';
import usePresenter from './usePresenter';
import styles from './pagination.module.css';

export default function Pagination(props: Readonly<IProps>) {
    const {
        className,
        activePage,
        pagesCount,
        onChangeActivePage,
    } = props;

    if (pagesCount <= 1) {
        return null;
    }

    const { pageRange } = usePresenter(props);
    const canGoPrev = activePage > 1;
    const canGoNext = activePage < pagesCount;

    return (
        <div className={ classNames(styles.pagination, className) }>
            <button
                type='button'
                className={ classNames(styles.button, styles.arrowButton) }
                disabled={ !canGoPrev }
                onClick={ () => onChangeActivePage(activePage - 1) }
                title='Предыдущая страница'
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    strokeWidth='2.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                >
                    <path d='M15 6C15 6 9 12 9 12C9 12 15 18 15 18' />
                </svg>
            </button>

            {
                pageRange.map((page, index) => {
                    if (typeof page === 'string') {
                        return (
                            <div
                                key={ `ellipsis-${index}` }
                                className={ styles.ellipsis }
                            >
                                { page }
                            </div>
                        );
                    }

                    const isActive = page === activePage;

                    return (
                        <button
                            key={ page }
                            type='button'
                            className={ classNames(styles.button, styles.pageButton, { [styles.active]: isActive }) }
                            onClick={ () => onChangeActivePage(page) }
                            disabled={ isActive }
                        >
                            { page }
                        </button>
                    );
                })
            }

            <button
                type='button'
                className={ classNames(styles.button, styles.arrowButton) }
                disabled={ !canGoNext }
                onClick={ () => onChangeActivePage(activePage + 1) }
                title='Следующая страница'
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    strokeWidth='2.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                >
                    <path d='M9 6C9 6 15 12 15 12C15 12 9 18 9 18' />
                </svg>
            </button>
        </div>
    );
}
