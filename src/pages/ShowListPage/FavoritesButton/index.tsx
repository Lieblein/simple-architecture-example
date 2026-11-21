import Button from '@components/Button';
import StarIcon from '../components/StarIcon';
import Popover from './Popover';
import usePresenter from './logic/usePresenter';
import styles from './favorites-button.module.css';
import FavoriteList from './FavoriteList';

export default function FavoritesButton() {
    const {
        click,
        popoverOpen,
        closePopover,
        favoriteCount,
        buttonRef,
        anchorElement,
    } = usePresenter();

    if (favoriteCount === 0) {
        return null;
    }

    return (
        <>
            <Button
                className={ styles.button }
                onClick={ click }
                ref={ buttonRef }
            >
                { favoriteCount }
                <StarIcon
                    variant='filled'
                    size={ 16 }
                />
            </Button>
            <Popover
                anchor={ anchorElement }
                open={ popoverOpen }
                onClose={ closePopover }
            >
                <FavoriteList />
            </Popover>
        </>
    );
}