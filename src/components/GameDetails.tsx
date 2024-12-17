import { useLocation } from "react-router-dom";

export const GameDetails = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const title = params.get("title");

    return (
        <div>
            <h1>Game Details</h1>
            <p>Title: {title}</p>
            {/* Add more details about the game here */}
        </div>
    );
};