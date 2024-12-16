declare module 'metacritic-scraper' {
    export interface MetacriticSearchResult {
        title: string;
        platform: string;
        metascore: number | null;
        url: string;
    }

    export interface MetacriticDetails {
        title: string;
        platform: string;
        metascore: number | null;
        url: string;
        releaseDate?: string;
        summary?: string;
        developer?: string;
        publisher?: string;
        genres?: string[];
    }

    export function search(params: { type: string; query: string }): Promise<MetacriticSearchResult[]>;
    export function getDetails(params: { type: string; url: string }): Promise<MetacriticDetails>;
}
