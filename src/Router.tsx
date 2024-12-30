import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Deals } from "./pages/Deals";
import { NotFound } from "./pages/NotFound";
import { GameDetails } from "./components/GameDetails";
import { Home } from "./pages/Home";

export const Router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "deals",
				element: <Deals />,
			},
			{
				path: "home",
				element: <Home />,
			},
			{
				path: "game-details/:title",
				element: <GameDetails />,
			},
		],
		errorElement: <NotFound></NotFound>,
	},
]);
