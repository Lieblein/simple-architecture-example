import { useMemo } from 'react';

export default function useBorderRadius(id: number, min: number, max: number) {
    return useMemo(
        () => {
            // FNV-1a или простая смесь битов
            let h = id * 2654435761; // Knuth multiplicative hash
            h = (h ^ (h >>> 16)) >>> 0;

            const range = max - min;

            return [0, 1, 2, 3]
                .map((i) => {
                    // сдвигаем биты, чтобы углы не коррелировали
                    const chunk = (h >>> (i * 5)) & 0x1f; // 5 бит = 0..31
                    return min + Math.round((chunk / 31) * range) + 'px';
                })
                .join(' ');
        },
        [id, min, max],
    );
}
