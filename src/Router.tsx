import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Deals } from "./pages/Deals";
import { NotFound } from "./pages/NotFound";
import { GameDetails } from "./components/GameDetails";

export const Router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "deals",
				element: <Deals />,
			},
			{
				path: "game-details/:title",
				element: <GameDetails />,
			},
		],
		errorElement: <NotFound></NotFound>,
	},
]);
