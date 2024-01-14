import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import ProductsDisplayer from "./components/ProductsDisplayer/ProductsDisplayer";
import landingImage from "./assets/landing.png";

function App() {
  return (
    <>
      <Header />
      <main>
        <div>
          <img
            src={landingImage}
            style={{
              width: "100%",
              height: "calc(100vh - 85px)",
            }}
          />
        </div>
        <div className="container">
          <ProductsDisplayer />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
