import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import SubCategoriesPage from "./pages/SubCategoriesPage/SubCategoriesPage";
import Layout from "./components/Layout";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetaillsPage/ProductDetailsPage";
import LoginPage from "./pages/AuthPages/LoginPage";
import SignupPage from "./pages/AuthPages/SignupPage";
import CartPage from "./pages/CartPage/CartPage";
import UserAccountPage from "./pages/UserAccountPage/UserAccountPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import { endpoints, userAccountEndPoints } from "./constants";
import ContactUsPage from "./pages/ContactUsPage/ContactUsPage";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: endpoints["home"], element: <HomePage /> },
      { path: endpoints["login"], element: <LoginPage /> },
      { path: endpoints["signup"], element: <SignupPage /> },
      {
        path: userAccountEndPoints["account_dashboard"],
        element: <UserAccountPage />,
      },
      {
        path: userAccountEndPoints["account_information"],
        element: <UserAccountPage />,
      },
      {
        path: userAccountEndPoints["address_book"],
        element: <UserAccountPage />,
      },
      { path: userAccountEndPoints["orders"], element: <UserAccountPage /> },
      { path: userAccountEndPoints["wishlist"], element: <UserAccountPage /> },
      { path: endpoints["products"], element: <ProductsPage /> },
      { path: endpoints["categories"], element: <CategoriesPage /> },
      {
        path: endpoints["sub_categories"](":categorySlug"),
        element: <SubCategoriesPage />,
      },
      {
        path: endpoints["category_products"](
          ":categorySlug",
          ":SubCategorySlug"
        ),
        element: <ProductsPage />,
      },
      {
        path: endpoints["product_details"](
          ":categorySlug",
          ":SubCategorySlug",
          ":productSlug"
        ),
        element: <ProductDetailsPage />,
      },
      { path: endpoints["cart"], element: <CartPage /> },
      { path: endpoints["checkout"], element: <CheckoutPage /> },
      { path: endpoints["payment"], element: <CheckoutPage /> },
      { path: endpoints["contact_us"], element: <ContactUsPage /> },
      { path: endpoints["about_us"], element: <AboutUsPage /> },
    ],
  },
]);

export default router;
