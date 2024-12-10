import axios from "axios";
import { IDealSearchResponse } from "../models/IDealSearchResponse";

interface IDealsSearchAPIResponse {
    deals: IDealSearchResponse[];
    totalResults: number;
}

export const getDealsSearch = async (
    search: string,
    pageSize: number,
    pageNumber: number
): Promise<IDealsSearchAPIResponse> => {
    // Fetch all results matching the query
    const response = await axios.get<IDealSearchResponse[]>(
        `https://www.cheapshark.com/api/1.0/deals?title=${search}`
    );
    const allDeals = response.data;

    // Calculate total results
    const totalResults = allDeals.length;

    // Paginate the results locally
    const startIndex = (pageNumber - 1) * pageSize;
    const paginatedDeals = allDeals.slice(startIndex, startIndex + pageSize);

    return {
        deals: paginatedDeals,
        totalResults: totalResults
    };
};