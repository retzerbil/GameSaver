import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Deals } from "./pages/Deals";
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { About } from "./pages/About";

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
				path: "about",
				element: <About />,
			},
		],
		errorElement: <NotFound></NotFound>,
	},
]);
