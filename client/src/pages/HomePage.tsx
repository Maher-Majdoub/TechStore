import { useNavigate } from "react-router-dom";
import ProductsDisplayer from "../components/ProductsDisplayer/ProductsDisplayer";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <ProductsDisplayer />
      <button onClick={() => navigate("/test")}>TestRouter</button>
    </>
  );
};

export default HomePage;
