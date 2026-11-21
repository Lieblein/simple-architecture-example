import { type IShow } from '@api/show';
import sendRequest from '@tasks/sendRequest';
import addNotification from '@tasks/addNotification';
import useShowListStore from '@store/showListStore';

const ITEMS_PER_PAGE = 3;
const DEBOUNCE_TIMEOUT = 200;

let abortController: AbortController | null = null;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

const updateAbortController = () => {
    abortController?.abort();
    abortController = new AbortController();

    return abortController.signal;
};

const clearDebounceTimer = () => {
    if (debounceTimer !== null) {
        clearTimeout(debounceTimer);
        debounceTimer = null;
    }
};

interface ISearchShowsParams {
    query: string;
    page: number;
    genres: string[];
}

interface ISearchShowsResponse {
    total: number;
    page: number;
    size: number;
    items: IShow[];
    genres: string[];
}

async function loadShows(
    params: ISearchShowsParams,
    abortControllerSignal: AbortSignal,
) {
    const { query, page, genres } = params;

    const queryParams = new URLSearchParams({
        q: query.trim(),
        page: String(page),
        size: String(ITEMS_PER_PAGE),
    });

    if (genres.length > 0) {
        queryParams.set('genres', genres.join(','));
    }

    return await sendRequest<ISearchShowsResponse>(
        'GET',
        `/api/search/show?${queryParams.toString()}`,
        undefined,
        { abortControllerSignal },
    );
}

export default function searchShows(params: ISearchShowsParams) {
    const { query, page, genres } = params;

    const {
        setShows,
        setFilter,
        setTotalPages,
        setPage,
        setAvailableGenres,
        setIsLoading,
        reset,
    } = useShowListStore.getState();

    setFilter({ search: query, selectedGenres: genres });
    setPage(page);

    clearDebounceTimer();

    debounceTimer = setTimeout(
        async () => {
            try {
                if (query.trim() === '') {
                    reset();

                    return;
                }

                setIsLoading(true);

                const abortControllerSignal = updateAbortController();
                const {
                    items,
                    total,
                    size,
                    genres: availableGenres,
                } = await loadShows(params, abortControllerSignal);

                setShows(items);
                setTotalPages(Math.ceil(total / size) || 1);
                setAvailableGenres(availableGenres);
            } catch (error) {
                if (error instanceof Error && error.name === 'AbortError') {
                    return null;
                }

                addNotification('Ошибка загрузки данных', 'error');
            } finally {
                setIsLoading(false);
            }
        },
        DEBOUNCE_TIMEOUT,
    );
}
