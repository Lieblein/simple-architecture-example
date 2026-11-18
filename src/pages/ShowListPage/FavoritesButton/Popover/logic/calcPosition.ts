import { type IPosition } from '../types';

const GAP = 10;

export default function calcPosition(
    anchorRect: DOMRect,
    popoverWidth: number,
    popoverHeight: number
): IPosition {
    const spaceAbove = anchorRect.top;
    const spaceBelow = window.innerHeight - anchorRect.bottom;
    const spaceLeft = anchorRect.left;
    const spaceRight = window.innerWidth - anchorRect.right;

    if (spaceBelow >= popoverHeight + GAP) {
        return {
            position: 'bottom' as const,
            top: anchorRect.bottom + GAP,
            left: anchorRect.left + anchorRect.width / 2 - popoverWidth / 2,
        };
    }

    if (spaceAbove >= popoverHeight + GAP) {
        return {
            position: 'top' as const,
            top: anchorRect.top - popoverHeight - GAP,
            left: anchorRect.left + anchorRect.width / 2 - popoverWidth / 2,
        };
    }

    if (spaceRight >= popoverWidth + GAP) {
        return {
            position: 'right' as const,
            top: anchorRect.top + anchorRect.height / 2 - popoverHeight / 2,
            left: anchorRect.right + GAP,
        };
    }

    if (spaceLeft >= popoverWidth + GAP) {
        return {
            position: 'left' as const,
            top: anchorRect.top + anchorRect.height / 2 - popoverHeight / 2,
            left: anchorRect.left - popoverWidth - GAP,
        };
    }

    return {
        position: 'bottom' as const,
        top: Math.max(GAP, window.innerHeight - popoverHeight - GAP),
        left: Math.max(GAP, Math.min(anchorRect.left + anchorRect.width / 2 - popoverWidth / 2, window.innerWidth - popoverWidth - GAP)),
    };
}