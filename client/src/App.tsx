import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

function App() {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
