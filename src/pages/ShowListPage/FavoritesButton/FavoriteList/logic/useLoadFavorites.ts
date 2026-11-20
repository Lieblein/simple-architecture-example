import { useEffect, useState } from 'react';
import loadFavorites from './tasks/loadFavorites';

export default function useLoadFavorites() {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(
        () => {
            (async () => {
                setIsLoading(true);
                await loadFavorites();
                setIsLoading(false);
            })();
        },
        [],
    );

    return isLoading;
}
