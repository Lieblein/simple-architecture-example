import classNames from '../../../../../../classNames';
import { type IProps } from './types';
import usePresenter from './usePresenter';
import styles from './genre-multiple-select.module.css';

export default function GenreMultipleSelect(props: Readonly<IProps>) {
    const { className, value } = props;
    const { options, toggleOption } = usePresenter(props);

    return (
        <div className={ classNames(className, styles.list) }>
            {
                options.map((option) => (
                    <button
                        key={ option }
                        className={ classNames(styles.chip, { [styles.selected]: value.includes(option) }) }
                        type='button'
                        onClick={ () => toggleOption(option) }
                    >
                        { option }
                    </button>
                ))
            }
        </div>
    );
}
