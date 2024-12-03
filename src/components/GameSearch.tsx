import { Button, List, TextInput } from "@mantine/core"
import { useState } from "react"
import { getGames } from "../Services/getGames";
import { IGameResponse } from "../models/IGameResponse";

export const GameSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<IGameResponse[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        try {
            const games = await getGames(query);
            console.log('Response from getGames:', games); // Log the response to see its structure
            if (Array.isArray(games)) {
                setResults(games);
            } else {
                setError('Unexpected response structure');
            }
        } catch (err) {
            setError('Failed to fetch games');
            console.error(err);
        }
    }

    return(
        <>
        <form onSubmit={handleSearch}>
            <TextInput 
                label="Search for a game"
                description="Enter the name of the game you want to search for"
                placeholder="Enter game name" 
                value={query}
                onChange={(event) => setQuery(event.currentTarget.value)}
            />
            <Button type="submit" variant="filled" color="orange">Search!</Button>
        </form>
        {error && <div>{error}</div>}
        <List>
            {results && results.map((game) => (
                <List.Item key={game.gameID}>
                    {game.external}
                    {game.cheapest}
                    <img src={game.thumb} alt={game.external} />
                </List.Item>
            ))}
        </List>
        </>
    );
}