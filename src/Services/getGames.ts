import axios from "axios";
import { IGameResponse } from "../models/IGameResponse";
import { IDealResponse } from "../models/IDealResponse";
import { getDeals } from "./getDeals"; // Import the getDeals function


export const getGamesMock = async (
    search: string
): Promise<IGameResponse[]> => {
    const response = await axios.get<IGameResponse[]>(
        `https://4054b73c-a292-4ac6-ad67-c0b03f40c2ef.mock.pstmn.io/https://www.cheapshark.com/api/1.0/games?title=${encodeURIComponent(search)}`
    );

    // Get deal details for each game
    const gamesWithDeals = await Promise.all(response.data.map(async (game) => {
        // Fetch the deals for each game
        const dealResponse: IDealResponse = await getDeals(game.cheapestDealID);
        console.log('Response from getDeals:', dealResponse);
        // Attach the deal information to the game
        return {
            ...game,
            deal: dealResponse,
        };
    }));

    return gamesWithDeals;
};

export const getGames = async (
    search: string
): Promise<IGameResponse[]> => {
    const response = await axios.get<IGameResponse[]>(
        `https://www.cheapshark.com/api/1.0/games?title=${encodeURIComponent(search)}`
    );

    // Get deal details for each game
    const gamesWithDeals = await Promise.all(response.data.map(async (game) => {
        // Fetch the deals for each game
        const dealResponse:IDealResponse = await getDeals(game.cheapestDealID);
        
        // Attach the deal information to the game
        return {
            ...game,
            deal: dealResponse,
        };
    }));

    return gamesWithDeals;
};
