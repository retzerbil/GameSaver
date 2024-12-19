import {
	Button,
	Group,
	Pagination,
	Select,
	TextInput,
	Flex,
	LoadingOverlay,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { DealCard } from "./DealCard";
import { getDealsSearch } from "../Services/getDeals";
import { IDealSearchResponse } from "../models/IDealSearchResponse";
import { IStoreResponse } from "../models/IStoreResponse";
import { getStores } from "../Services/getStores";

export const GameSearch = () => {
	const [query, setQuery] = useState("");
	const [lastQuery, setLastQuery] = useState("");
	const [results, setResults] = useState<IDealSearchResponse[] | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [activePage, setActivePage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [isLoading, setIsLoading] = useState(false);
	const [totalResults, setTotalResults] = useState(0);
	const [sortOption, setSortOption] = useState("highestDiscount");
	const [stores, setStores] = useState<IStoreResponse[]>([]);

	const fetchDeals = async () => {
		if (!query) return;

		setIsLoading(true);
		setError(null);

		try {
			const response = await getDealsSearch(query, pageSize, activePage);
			console.log("response", response);
			setResults(response.deals);
			setTotalResults(response.totalResults);
			sortResults(sortOption, response.deals);
		} catch (err) {
			setError("Failed to fetch games");
		} finally {
			setIsLoading(false);
		}
	};

	const handleSearch = (event: React.FormEvent) => {
		event.preventDefault();
		setActivePage(1);
		setLastQuery(query);
		fetchDeals();
	};

	const handleSortChange = (value: string | null) => {
		const newSortOption = value || "highestDiscount";
		setSortOption(newSortOption);
		if (results) {
			sortResults(newSortOption, results);
		}
	};

	const sortResults = (option: string, deals: IDealSearchResponse[]) => {
		let sortedResults = [...deals];
		switch (option) {
			case "alphabetical":
				sortedResults.sort((a, b) => a.title.localeCompare(b.title));
				break;
			case "lowestPrice":
				sortedResults.sort((a, b) => +a.salePrice - +b.salePrice);
				break;
			case "highestDiscount":
				sortedResults.sort((a, b) => +b.savings - +a.savings);
				break;
			default:
				break;
		}
		setResults(sortedResults);
	};

	const handlePageSizeChange = (size: string | null) => {
		if (size) {
			setPageSize(Number(size));
			setIsLoading(true);
		}
	};

	useEffect(() => {
		if (query) {
			fetchDeals();
		}
	}, [activePage, pageSize]);

	useEffect(() => {
		const fetchStores = async () => {
			const storedStores = localStorage.getItem("stores");
			if (storedStores) {
				setStores(JSON.parse(storedStores));
			} else {
				const fetchedStores = await getStores();
				localStorage.setItem("stores", JSON.stringify(fetchedStores));
				setStores(fetchedStores);
			}
		};

		fetchStores();
	}, []);

	return (
		<>
			<form onSubmit={handleSearch}>
				<Group justify="center">
					<TextInput
						label="Search for a game"
						description="Enter the name of the game you want to search for"
						placeholder="Enter game name"
						value={query}
						onChange={(event) => setQuery(event.currentTarget.value)}
					/>
					<Button type="submit" variant="filled" color="orange">
						Search
					</Button>
				</Group>
			</form>
			<div style={{ position: "relative" }}>
				<LoadingOverlay
					visible={isLoading}
					zIndex={1000}
					overlayProps={{ radius: "sm", blur: 2 }}
				/>

				{error && <p style={{ color: "red" }}>{error}</p>}

				{!isLoading && results && results.length === 0 && (
					<p>
						No games found for <em>"{lastQuery}"</em>. The game may not
						currently be on sale, or there may be an error in the search
						spelling. Please try a different search query.
					</p>
				)}
				{results && results.length > 0 && (
					<Group>
						<Select
							label="Sort by"
							placeholder="Choose sorting option"
							data={[
								{ value: "alphabetical", label: "Alphabetical" },
								{ value: "lowestPrice", label: "Lowest Price" },
								{ value: "highestDiscount", label: "Highest Discount" },
							]}
							value={sortOption}
							onChange={handleSortChange}
						/>
					</Group>
				)}
				<Flex
					mih={50}
					gap="xl"
					justify="center"
					align="center"
					direction="row"
					wrap="wrap"
					mt="lg"
				>
					{results?.map((deal) => {
						console.log(
							"Matching store:",
							stores?.find((store) => store.storeID === String(deal.storeID))
						);
						const store = stores?.find(
							(store) => store.storeID === String(deal.storeID)
						);

						return <DealCard key={deal.dealID} deal={deal} store={store} />;
					})}
				</Flex>

				{results && results.length > 0 && (
					<Group>
						<Pagination
							value={activePage}
							onChange={setActivePage}
							total={Math.ceil(totalResults / pageSize)}
							mt="lg"
						/>
						<Select
							label="Results per page"
							placeholder="Choose page size"
							data={[
								{ value: "5", label: "5" },
								{ value: "10", label: "10" },
								{ value: "20", label: "20" },
								{ value: "50", label: "50" },
							]}
							onChange={handlePageSizeChange}
						/>
					</Group>
				)}
			</div>
		</>
	);
};
