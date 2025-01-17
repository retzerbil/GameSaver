import {
	Button,
	Group,
	Pagination,
	Select,
	TextInput,
	LoadingOverlay,
	SimpleGrid,
	Container,
	Text,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { DealCard } from "./DealCard";
import { getDealsSearch } from "../Services/getDeals";
import { IDealSearchResponse } from "../models/IDealSearchResponse";
import { IStoreResponse } from "../models/IStoreResponse";
import { getStores } from "../Services/getStores";
import { IconSearch } from "@tabler/icons-react";

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

	useEffect(() => {
		const savedQuery = sessionStorage.getItem("lastQuery");
		const savedResults = sessionStorage.getItem("lastResults");

		if (savedQuery) {
			setQuery(savedQuery);
			setLastQuery(savedQuery);
		}

		if (savedResults) {
			const parsedResults = JSON.parse(savedResults);
			setResults(parsedResults);
			setTotalResults(parsedResults.length);
		}
	}, []);

	useEffect(() => {
		if (lastQuery) {
			fetchDeals();
		}
	}, [lastQuery]);

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

			// Save the last query and results to session storage to persist data on page refresh or when navigating back to the page.
			// This is done to avoid making the same API call again when the user navigates back to the page.
			// The data is cleared when the user makes a new search.
			// Sessionstorage is used instead of localstorage so the data is cleared when the tab is closed.
			sessionStorage.setItem("lastResults", JSON.stringify(response.deals));
			sessionStorage.setItem("lastQuery", query);
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
		// Stores are needed to fetch store data for each deal.
		// This is done once and stored in local storage to save on API calls that would otherwise need to be fetched from each deal.
		// If store data is older than one day, fetch new data.
		// Stores aren't updated frequently so this should be fine. And if its missing a store the user can still see the deal. It just won't have store data i.e logo and name.
		const fetchStores = async () => {
			const storedStores = localStorage.getItem("stores");
			const storedTimestamp = localStorage.getItem("storesTimestamp");
			const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds

			if (storedStores && storedTimestamp) {
				const currentTime = new Date().getTime();
				const storedTime = new Date(parseInt(storedTimestamp, 10)).getTime();

				if (currentTime - storedTime < oneDay) {
					setStores(JSON.parse(storedStores));
					return;
				}
			}

			const fetchedStores = await getStores();
			localStorage.setItem("stores", JSON.stringify(fetchedStores));
			localStorage.setItem("storesTimestamp", new Date().getTime().toString());
			setStores(fetchedStores);
		};

		fetchStores();
	}, []);

	return (
		<>
			<section style={{ position: "relative" }}>
				<form onSubmit={handleSearch}>
					<Group className="searchGroup" justify="center" p={10}>
						<TextInput
							label="Search for a game"
							description="Enter the name of the game you want to search for"
							placeholder="Enter game name"
							value={query}
							onChange={(event) => setQuery(event.currentTarget.value)}
							leftSection={<IconSearch color="black" />}
						/>
						<Button
							type="submit"
							variant="filled"
							color="orange"
							className="searchButton"
						>
							Search
						</Button>
					</Group>
				</form>

				<LoadingOverlay
					className="loadingOverlay"
					visible={isLoading}
					zIndex={1000}
					overlayProps={{ radius: "lg", blur: 2 }}
				/>

				{error && <p style={{ color: "red" }}>{error}</p>}

				{!isLoading && results && results.length === 0 && (
					<p className="noResults">
						No games found for <em>"{lastQuery}"</em>. The game may not
						currently be on sale, or there may be an error in the search
						spelling. Please try a different search query.
					</p>
				)}
				{results && results.length > 0 && (
					<Group className="sortGroup">
						<Select
							withCheckIcon={false}
							className="sortSelect"
							placeholder="Choose sorting option"
							data={[
								{ value: "alphabetical", label: "Alphabetical" },
								{ value: "lowestPrice", label: "Lowest Price" },
								{ value: "highestDiscount", label: "Highest Discount" },
							]}
							value={sortOption}
							onChange={handleSortChange}
							p={10}
						/>
					</Group>
				)}
				{results && results.length > 0 && (
					<Container fluid m={"1rem"} p={"1rem"} className="dealCardContainer">
						{/* SimpleGrid is used to display the deals in a grid layout. The number of columns changes based on the screen size. */}
						<SimpleGrid
							cols={{ xs: 1, sm: 2, md: 3, lg: 5 }}
							style={{
								justifyItems: "center",
								alignItems: "center",
							}}
						>
							{results?.map((deal) => {
								const store = stores?.find(
									(store) => store.storeID === String(deal.storeID)
								);

								return <DealCard key={deal.dealID} deal={deal} store={store} />;
							})}
						</SimpleGrid>
					</Container>
				)}
				{results && results.length > 0 && (
					<Group className="paginationGroup">
						<Select
							className="pageSizeSelect"
							placeholder="Choose page size"
							id="pageSizeSelect"
							data={[
								{ value: "5", label: "5" },
								{ value: "10", label: "10" },
								{ value: "20", label: "20" },
								{ value: "50", label: "50" },
							]}
							onChange={handlePageSizeChange}
							pt={10}
						/>
						<Pagination
							className="pagination"
							value={activePage}
							onChange={setActivePage}
							total={Math.ceil(totalResults / pageSize)}
							mt="lg"
						/>
					</Group>
				)}
				<footer className="footer">
					<Container>
						<Group justify="space-between">
							<Text size="sm" color="dimmed">
								Retzerbil coding LLC
							</Text>
							<Text size="xs" color="dimmed" mt="xs">
								Disclaimer: The deals shown on this page are updated
								periodically. Prices and availability may change quickly, and
								deals can expire without notice. GameSaver recommends checking
								the store's website for the most accurate and current
								information. Please note that games with ended sales may take
								time to be removed from the API and may show up as 0% discounts.
								Please take note before purchasing that some deals and games may
								not be available in your region.
							</Text>
						</Group>
					</Container>
				</footer>
			</section>
		</>
	);
};
