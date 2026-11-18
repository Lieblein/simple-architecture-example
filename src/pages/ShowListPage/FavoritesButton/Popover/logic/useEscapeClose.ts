import { useEffect } from 'react';
import { type IProps } from '../types';

export default function useEscapeClose(props: Readonly<IProps>) {
    const { open, onClose } = props;

    useEffect(
        () => {
            if (!open) {
                return;
            }

            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    onClose();
                }
            };

            document.addEventListener('keydown', handleKeyDown);

            return () => {
                document.removeEventListener('keydown', handleKeyDown);
            };
        },
        [open, onClose],
    );
}