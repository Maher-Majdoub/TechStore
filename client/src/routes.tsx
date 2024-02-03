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
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import { endpoints } from "./constants";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: endpoints["homePage"], element: <HomePage /> },
      { path: endpoints["login"], element: <LoginPage /> },
      { path: endpoints["signup"], element: <SignupPage /> },
      { path: endpoints["accountDashboard"], element: <UserAccountPage /> },
      { path: endpoints["accountInformation"], element: <UserAccountPage /> },
      { path: endpoints["addressBook"], element: <UserAccountPage /> },
      { path: endpoints["orders"], element: <UserAccountPage /> },
      { path: endpoints["wishlist"], element: <UserAccountPage /> },
      { path: endpoints["compareProducts"], element: <UserAccountPage /> },
      { path: endpoints["products"], element: <ProductsPage /> },
      { path: endpoints["categories"], element: <CategoriesPage /> },
      {
        path: endpoints["subCategories"](":categorySlug"),
        element: <SubCategoriesPage />,
      },
      {
        path: endpoints["categoryProducts"](
          ":categorySlug",
          ":SubCategorySlug"
        ),
        element: <ProductsPage />,
      },
      {
        path: endpoints["productDetails"](
          ":categorySlug",
          ":SubCategorySlug",
          ":productSlug"
        ),
        element: <ProductDetailsPage />,
      },
      { path: endpoints["cart"], element: <CartPage /> },
      { path: endpoints["checkout"], element: <CheckoutPage /> },
      { path: endpoints["payment"], element: <CheckoutPage /> },
    ],
  },
]);

export default router;
