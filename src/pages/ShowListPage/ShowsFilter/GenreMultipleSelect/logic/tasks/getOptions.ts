export function getOptions(availableGenres: string[], selectedGenres: string[]) {
    const options = new Set(selectedGenres.concat(availableGenres));

    return Array.from(options).sort();
}
