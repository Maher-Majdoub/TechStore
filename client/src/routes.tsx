import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import SubCategoriesPage from "./pages/SubCategoriesPage";
import Layout from "./components/Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/categories/",
        element: <CategoriesPage />,
      },
      {
        path: "/categories/:categorySlug",
        element: <SubCategoriesPage />,
      },
    ],
  },
]);

export default router;
