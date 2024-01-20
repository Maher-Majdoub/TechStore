import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import SubCategoriesPage from "./pages/SubCategoriesPage";
import Layout from "./components/Layout";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import TestAuthenticationPage from "./pages/TestAuthenticationPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/customer", element: <TestAuthenticationPage /> },
      {
        path: "/categories/",
        element: <CategoriesPage />,
      },
      {
        path: "/categories/:categorySlug",
        element: <SubCategoriesPage />,
      },
      {
        path: "/categories/:categorySlug/:SubCategorySlug",
        element: <ProductsPage />,
      },
      {
        path: "/categories/:categorySlug/:SubCategorySlug/:productSlug",
        element: <ProductDetailsPage />,
      },
    ],
  },
]);

export default router;
