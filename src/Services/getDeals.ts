import axios from "axios";
import { IDealResponse } from "../models/IDealResponse";

export const getDealsmock = async (
    dealID: string
): Promise<IDealResponse> => {
    const response = await axios.get<IDealResponse>(
        `https://4054b73c-a292-4ac6-ad67-c0b03f40c2ef.mock.pstmn.io/https://www.cheapshark.com/api/1.0/deals?id=DnVEZriqpYWyJoC4CN2%2Fe07Su8RZ61DATyjmfNk%2FwKI%3D`
    );
    return response.data;
};  


export const getDeals = async (
    dealID: string
): Promise<IDealResponse> => {
    const response = await axios.get<IDealResponse>(
        `https://www.cheapshark.com/api/1.0/deals?id=${dealID}`
    );
    return response.data;
};