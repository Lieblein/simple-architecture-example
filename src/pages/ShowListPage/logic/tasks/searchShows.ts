import { type IShow } from '@api/show';
import sendRequest from '@tasks/sendRequest';
import addNotification from '../../../../tasks/addNotification';
import useShowListStore from '@store/showListStore';

const ITEMS_PER_PAGE = 3;

let abortController: AbortController | null = null;
const updateAbortController = () => {
    abortController?.abort();
    abortController = new AbortController();

    return abortController.signal;
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

export default async function searchShows(params: ISearchShowsParams) {
    const { query, page, genres } = params;

    const {
        setShows,
        setFilter,
        setPagination,
        setPage,
        setAvailableGenres,
        setIsLoading,
        reset,
    } = useShowListStore.getState();

    setFilter({ search: query, selectedGenres: genres });
    setPage(page);

    try {
        if (query.trim() === '') {
            const response = {
                shows: [],
                pagination: {
                    activePage: 1,
                    totalPages: 0,
                },
                availableGenres: [],
            };

            reset();

            return response;
        }

        setIsLoading(true);

        const queryParams = new URLSearchParams({
            q: query.trim(),
            page: String(page),
            size: String(ITEMS_PER_PAGE),
        });

        if (genres.length > 0) {
            queryParams.set('genres', genres.join(','));
        }

        const abortControllerSignal = updateAbortController();
        const {
            items,
            page: activePage,
            total,
            size,
            genres: availableGenres,
        } = await sendRequest<ISearchShowsResponse>(
            'GET',
            `/api/search/show?${queryParams.toString()}`,
            undefined,
            { abortControllerSignal },
        );

        const response = {
            shows: items,
            pagination: {
                activePage,
                totalPages: Math.ceil(total / size) || 1,
            },
            availableGenres,
        };

        setShows(items);
        setPagination(response.pagination);
        setAvailableGenres(availableGenres);

        return response;
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            return null;
        }

        addNotification('Ошибка загрузки данных', 'error');
    } finally {
        setIsLoading(false);
    }
}
