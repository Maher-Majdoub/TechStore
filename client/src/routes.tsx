import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import SubCategoriesPage from "./pages/SubCategoriesPage/SubCategoriesPage";
import Layout from "./components/Layout";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetaillsPage/ProductDetailsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage/CartPage";
import UserAccountPage from "./pages/UserAccountPage/UserAccountPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/customer", element: <UserAccountPage /> },
      { path: "/products", element: <ProductsPage /> },
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
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },
]);

export default router;
