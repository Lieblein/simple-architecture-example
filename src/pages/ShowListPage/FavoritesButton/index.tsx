import Button from '@components/Button';
import StarIcon from '../components/StarIcon';
import usePresenter from './logic/usePresenter';
import { type IProps } from './types';
import styles from './favorites-button.module.css';

export default function FavoritesButton(props: Readonly<IProps>) {
    const { favoriteCount } = usePresenter();

    return (
        <Button
            className={ styles.button }
            onClick={ () => {} }
            title='В избранном'
        >
            { favoriteCount }
            <StarIcon
                variant='filled'
                size={ 16 }
            />
        </Button>
    );
}