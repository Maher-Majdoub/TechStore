import "./App.css";
import Footer from "./components/Footer/Footer";
// import CategoriesDisplayer from "./components/CategoriesDisplayer";
import Header from "./components/Header/Header";
import Minicart from "./components/Minicart/Minicart";
import ProductsDisplayer from "./components/ProductsDisplayer/ProductsDisplayer";
// import ProductsDisplayer from "./components/ProductsDisplayer";

function App() {
  return (
    <>
      <Header />
      <main className="container">
        {/* <ProductsDisplayer /> */}
        <Minicart />
      </main>
      <Footer />
    </>
  );
}

export default App;
