import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";

export const Router = createBrowserRouter([{
    path: "/",
    element: <Layout />,
    children: [{
        path:"/home",
        element: <Home />
    }
],
errorElement: <NotFound></NotFound>
}])