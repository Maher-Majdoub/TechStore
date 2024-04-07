import Header from "./Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <>
      <Header />
      <ToastContainer position="top-center" autoClose={1500} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
