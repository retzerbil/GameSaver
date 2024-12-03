import axios from "axios"
import { IGameResponse } from "../models/IGameResponse"

export const getGames = async (
    search: string
): Promise<IGameResponse> => {
    const response = await axios.get<IGameResponse>(
        `https://www.cheapshark.com/api/1.0/games?title=${search}`
    );
    return response.data;
}