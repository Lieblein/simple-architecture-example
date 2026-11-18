import type { ReactNode } from 'react';

export type PopoverPosition = 'top' | 'bottom' | 'left' | 'right';

export interface IPosition {
    position: PopoverPosition;
    top: number;
    left: number;
}

export interface IProps {
    className?: string;
    anchor: HTMLButtonElement | null;
    open: boolean;
    onClose: () => void;
    children: ReactNode;
}