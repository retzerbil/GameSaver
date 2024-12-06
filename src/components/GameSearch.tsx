import {
	Button,
	Group,
	List,
	Pagination,
	Select,
	TextInput,
	Loader,
	Flex,
	LoadingOverlay,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { DealCard } from "./DealCard";
import { getDealsSearch } from "../Services/getDeals";
import { IDealSearchResponse } from "../models/IDealSearchResponse";

export const GameSearch = () => {
	const [query, setQuery] = useState("");
	const [lastQuery, setLastQuery] = useState("");
	const [results, setResults] = useState<IDealSearchResponse[] | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [activePage, setActivePage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [isLoading, setIsLoading] = useState(false);
	const [totalResults, setTotalResults] = useState(0);
	const [sortOption, setSortOption] = useState("alphabetical");

	const fetchDeals = async () => {
		if (!query) return;

		setIsLoading(true);
		setError(null);

		try {
			const games = await getDealsSearch(query, pageSize, activePage);
			setResults(games);
			setTotalResults(100); // Replace with the actual `totalResults` from API
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
		if (value) {
			setSortOption(value);
			sortResults(value);
		}
	};

	const sortResults = (option: string) => {
		let sortedResults = results ? [...results] : [];
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

	return (
		<>
			<form onSubmit={handleSearch}>
				<TextInput
					label="Search for a game"
					description="Enter the name of the game you want to search for"
					placeholder="Enter game name"
					value={query}
					onChange={(event) => setQuery(event.currentTarget.value)}
				/>
				<Button type="submit" variant="filled" color="orange">
					Search!
				</Button>
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
						No games found for <em>"{lastQuery}"</em>. Please try a different
						search query.
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
					justify="flex-start"
					align="center"
					direction="row"
					wrap="wrap"
					mt="lg"
				>
					{results?.map((deal) => (
						<DealCard key={deal.dealID} deal={deal} />
					))}
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
