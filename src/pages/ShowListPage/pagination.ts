export function getPagesCount<T>(list: T[], itemsPerPage: number) {
    if (itemsPerPage === 0) {
        throw new Error('getPagesCount, itemsPerPage = 0');
    }

    return Math.ceil(list.length / itemsPerPage);
}

export function getListForPage<T>(list: T[], activePage: number, itemsPerPage: number) {
    if (activePage === 0) {
        throw new Error('getListForPage, activePage = 0');
    }

    const firstItem = itemsPerPage * (activePage - 1);
    const lastItem = firstItem + itemsPerPage;

    return list.slice(firstItem, lastItem);
}
