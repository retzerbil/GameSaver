export interface IMetacriticDetailedResponse {
    title: string;
    score: number;
    releaseDate: string;
    summary: string;
    platform: string;
    genres?: string[];
    publisher?: string;
    developer?: string;
    rating?: string;
    url?: string;
}