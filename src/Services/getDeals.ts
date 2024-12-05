import axios from "axios";
import { IDealSearchResponse } from "../models/IDealSearchResponse";

export const getDealsSearch = async (
    search: string,
    pageSize: number,
    pageNumber: number
): Promise<IDealSearchResponse[]> => {
    const response = await axios.get<IDealSearchResponse[]>(
        `https://www.cheapshark.com/api/1.0/deals?title=${search}&pageSize=${pageSize}&pageNumber=${pageNumber}`
    );
    return response.data;
}