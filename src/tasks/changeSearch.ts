import { type IShow } from '@api/show';
import { sendRequest } from '@utils/request';
import { useNotificationStore } from '@store/notificationStore';
import { useShowListStore } from '@store/showListStore';

let abortController: AbortController | null = null;

export async function changeSearch(search: string): Promise<void> {
    abortController?.abort();
    abortController = new AbortController();

    useShowListStore.setState({
        search,
        activePage: 1,
        isLoading: true,
    });

    if (search.trim() === '') {
        abortController = null;
        useShowListStore.setState({ shows: [], isLoading: false });
        return;
    }

    try {
        // TODO: вынести работу с апи в отдельную таску
        const data = await sendRequest<Array<{ score: number; show: IShow }>>(
            'GET',
            `https://api.tvmaze.com/search/shows?q=${search.trim()}`,
            abortController.signal,
        );
        const shows = data.map(({ show }) => show);
        useShowListStore.setState({ shows, isLoading: false });
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            return;
        }

        useNotificationStore.getState().addNotification('Ошибка загрузки данных', 'error');
        useShowListStore.setState({ isLoading: false });
    }
}