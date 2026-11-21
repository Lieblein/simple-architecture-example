export function calculateBorderRadius(id: number, min: number, max: number): string {
    let h = id * 2654435761;
    h = (h ^ (h >>> 16)) >>> 0;

    const range = max - min;

    return [0, 1, 2, 3]
        .map((i) => {
            const chunk = (h >>> (i * 5)) & 0x1f;
            return min + Math.round((chunk / 31) * range) + 'px';
        })
        .join(' ');
}