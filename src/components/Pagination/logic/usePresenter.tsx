import { useMemo } from 'react';
import { IPagination } from '@ui/pagination';
import { type IProps } from '../types';

function getPageRange({ activePage, totalPages }: IPagination): (number | '...')[] {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | '...')[] = [];

    const leftEllipsis = activePage > 3;
    const rightEllipsis = activePage < totalPages - 2;

    pages.push(1);

    if (leftEllipsis) {
        pages.push('...');
    }

    const start = leftEllipsis ? Math.max(2, activePage - 1) : 2;
    const end = rightEllipsis ? Math.min(totalPages - 1, activePage + 1) : totalPages - 1;

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (rightEllipsis) {
        pages.push('...');
    }

    pages.push(totalPages);

    return pages;
}

export default function usePresenter(props: IProps) {
    const {
        pagination,
        pagination: {
            activePage,
            totalPages,
        },
    } = props;

    const canGoPrev = activePage > 1;
    const canGoNext = activePage < totalPages;

    const pageRange = useMemo(
        () => getPageRange(pagination),
        [pagination],
    );

    return {
        pageRange,
        canGoNext,
        canGoPrev,
    };
}
