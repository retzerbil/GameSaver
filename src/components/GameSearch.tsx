import {
	Button,
	Group,
	List,
	Pagination,
	Select,
	TextInput,
	Loader,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { DealCard } from "./DealCard";
import { getDealsSearch } from "../Services/getDeals";
import { IDealSearchResponse } from "../models/IDealSearchResponse";

export const GameSearch = () => {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<IDealSearchResponse[] | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [activePage, setActivePage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [isLoading, setIsLoading] = useState(false);
	const [totalResults, setTotalResults] = useState(0); // Total results from API

    const fetchDeals = async () => {
        if (!query) return; // Prevent search if query is empty
    
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
        setActivePage(1); // Reset to first page on a new search
        fetchDeals();
    };
    
    const handlePageSizeChange = (size: string | null) => {
        if (size) {
            setPageSize(Number(size));
            setIsLoading(true); // Show loader when page size changes
        }
    };
    
    // Trigger the fetch when page size or active page changes
    useEffect(() => {
        if (query) {
            fetchDeals();
        }
    }, [activePage, pageSize]); // Dependency on pageSize and activePage, but not query
    
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
    
            {isLoading && <Loader color="orange" />}
            {error && <p style={{ color: "red" }}>{error}</p>}
    
            <List spacing="md" mt="lg">
                {results?.map((deal) => (
                    <DealCard key={deal.dealID} deal={deal} />
                ))}
            </List>
    
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
        </>
    );
};
