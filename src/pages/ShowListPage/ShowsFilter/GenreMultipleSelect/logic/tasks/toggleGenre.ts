export default function toggleGenre(genre: string, genres: string[]) {
    const selected = genres.includes(genre);

    const newGenres = selected
        ? genres.filter((item) => item !== genre)
        : genres.concat(genre);
    
    return newGenres;
}
