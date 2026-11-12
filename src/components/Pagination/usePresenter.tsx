import { useMemo } from 'react';

import { type IProps } from './types';

function getPageRange(activePage: number, pagesCount: number): (number | '...')[] {
    if (pagesCount <= 7) {
        return Array.from({ length: pagesCount }, (_, i) => i + 1);
    }

    const pages: (number | '...')[] = [];

    const leftEllipsis = activePage > 3;
    const rightEllipsis = activePage < pagesCount - 2;

    pages.push(1);

    if (leftEllipsis) {
        pages.push('...');
    }

    const start = leftEllipsis ? Math.max(2, activePage - 1) : 2;
    const end = rightEllipsis ? Math.min(pagesCount - 1, activePage + 1) : pagesCount - 1;

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (rightEllipsis) {
        pages.push('...');
    }

    pages.push(pagesCount);

    return pages;
}

export default function usePresenter(props: IProps) {
    const {
        activePage,
        pagesCount,
    } = props;

    const pageRange = useMemo(
        () => getPageRange(activePage, pagesCount),
        [activePage, pagesCount],
    );

    return { pageRange };
}
