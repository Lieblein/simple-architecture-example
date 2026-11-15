import { type IShow } from '@api/show';
import sendRequest from '@tasks/sendRequest';
import { useNotificationStore } from '@store/notificationStore';

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

    try {
        if (query.trim() === '') {
            return {
                shows: [],
                pagination: {
                    activePage: 1,
                    totalPages: 0,
                },
                availableGenres: [],
            };
        }

        const queryParams = new URLSearchParams({
            q: query.trim(),
            page: String(page),
            size: String(ITEMS_PER_PAGE),
        });

        if (genres.length > 0) {
            queryParams.set('genres', genres.join(','));
        }

        const abortControllerSignal = updateAbortController();
        const data = await sendRequest<ISearchShowsResponse>(
            'GET',
            `/api/search/shows?${queryParams.toString()}`,
            { abortControllerSignal },
        );

        return {
            shows: data.items,
            pagination: {
                activePage: data.page,
                totalPages: Math.ceil(data.total / data.size) || 1,
            },
            availableGenres: data.genres,
        };
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            return null;
        }

        // TODO: где лучше обрабатывать ошибки?
        useNotificationStore.getState().addNotification('Ошибка загрузки данных', 'error');
        throw error;
    }
}
