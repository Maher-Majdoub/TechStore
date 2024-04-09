import Header from "./Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const Layout = () => {
  return (
    <>
      <Header />
      <ToastContainer position="top-center" autoClose={1500} />
      <ScrollToTop />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
