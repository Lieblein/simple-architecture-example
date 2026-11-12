export interface IShow {
    id: number;
    name: string;
    image: {
        medium: string;
        original: string;
    } | null;
    genres: string[];
}