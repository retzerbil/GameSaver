import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import metacritic from 'metacritic-scraper';
import { IMetacriticDetailedResponse } from '../models/IMetacriticDetailedReponse';

export const GameDetails = () => {
    const { title } = useParams<{ title: string }>();
    const [searchResults, setSearchResults] = useState<IMetacriticDetailedResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Function to fetch search results with extra details
    const fetchSearchResults = async (gameTitle: string) => {
        setLoading(true);
        setError(null);

        try {
            // Fetch search results
            const results = await metacritic.search({
                type: 'game',
                query: gameTitle
            });

            // Fetch detailed information for each result
            const detailedResults: IMetacriticDetailedResponse[] = await Promise.all(
                results.map(async (result: any) => {
                    const details = await metacritic.getDetails({
                        type: 'game',
                        url: result.url
                    });

                    return {
                        title: details.title,
                        platform: details.platform,
                        metascore: details.metascore ? Number(details.metascore) : null,
                        score: details.metascore ? Number(details.metascore) : 0,
                        url: details.url,
                        releaseDate: details.releaseDate || undefined,
                        summary: details.summary || undefined,
                        developer: details.developer || undefined,
                        publisher: details.publisher || undefined,
                        genres: details.genres || [],
                    };
                })
            );

            setSearchResults(detailedResults);
        } catch (err) {
            setError("Failed to fetch game details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (title) {
            fetchSearchResults(title);
        }
    }, [title]);

    return (
        <div>
            <h1>Game Details</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {searchResults.map((result) => (
                <div key={result.url}>
                    <h2>{result.title}</h2>
                    <p>Platform: {result.platform}</p>
                    <p>Metascore: {result.metascore}</p>
                    <p>Release Date: {result.releaseDate}</p>
                    <p>Summary: {result.summary}</p>
                    <p>Developer: {result.developer}</p>
                    <p>Publisher: {result.publisher}</p>
                    <p>Genres: {result.genres.join(', ')}</p>
                    <a href={result.url} target="_blank" rel="noopener noreferrer">View on Metacritic</a>
                </div>
            ))}
        </div>
    );
};