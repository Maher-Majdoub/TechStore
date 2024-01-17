import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/product/:productSlug", element: <ProductDetailsPage /> },
  { path: "/error", element: <ErrorPage /> },
]);

export default router;
