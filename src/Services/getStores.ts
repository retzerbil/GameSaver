import axios from "axios";
import { IStoreResponse } from "../models/IStoreResponse";

export const getStores = async (): Promise<IStoreResponse[]> => {
	const response = await axios.get<IStoreResponse[]>(
		`https://www.cheapshark.com/api/1.0/stores`
	);
	return response.data;
};
