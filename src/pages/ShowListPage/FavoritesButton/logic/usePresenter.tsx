import { useState, useRef, useEffect } from 'react';
import useFavoritesStore from '@store/favoritesStore';

// TODO: тут надо всё переделать!
export default function usePresenter() {
    const [popoverOpen, setPopoverOpen] = useState(false);
    const closePopover = () => setPopoverOpen(false);
    const click = () => { setPopoverOpen(true); };

    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(null);
    useEffect(() => { setAnchorElement(buttonRef.current); }, [popoverOpen]);

    const favoriteShows = useFavoritesStore(({ favoriteShows }) => favoriteShows);

    return {
        click,
        popoverOpen,
        closePopover,
        favoriteCount: favoriteShows.size,
        buttonRef,
        anchorElement,
    };
}