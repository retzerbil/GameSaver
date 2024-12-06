import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Deals } from "./pages/Deals";
import { NotFound } from "./pages/NotFound";

export const Router = createBrowserRouter([{
    path: "/",
    element: <Layout />,
    children: [{
        path:"/deals",
        element: <Deals />
    }
],
errorElement: <NotFound></NotFound>
}])