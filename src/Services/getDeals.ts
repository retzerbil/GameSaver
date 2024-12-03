import axios from "axios";
import { IDealResponse } from "../models/IDealResponse";

export const getDeals = async (
    dealID: string
): Promise<IDealResponse> => {
    const response = await axios.get<IDealResponse>(
        `https://www.cheapshark.com/api/1.0/deals?id=${dealID}`
    );
    return response.data;
};