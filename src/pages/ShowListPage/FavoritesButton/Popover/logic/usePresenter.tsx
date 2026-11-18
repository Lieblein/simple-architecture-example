import { useState, useRef, useEffect } from 'react';
import { type IProps, type IPosition } from '../types';
import calcPosition from './calcPosition';
import useEscapeClose from './useEscapeClose';

export default function usePresenter(props: Readonly<IProps>) {
    const { anchor, open } = props;

    useEscapeClose(props);

    const popoverRef = useRef<HTMLDivElement | null>(null);
    const [position, setPosition] = useState<IPosition | null>(null);

    useEffect(
        () => {
            if (!open || !anchor || !popoverRef.current) {
                return;
            }

            const anchorRect = anchor.getBoundingClientRect();
            const popoverWidth = popoverRef.current.offsetWidth;
            const popoverHeight = popoverRef.current.offsetHeight;

            setPosition(calcPosition(anchorRect, popoverWidth, popoverHeight));
        },
        [anchor, open],
    );

    return {
        position,
        popoverRef,
    };
}