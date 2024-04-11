import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { NextPageContext } from "./contexts";
import { endpoints } from "./constants";
import { useState } from "react";

function App() {
  const [nextPage, setNextPage] = useState(endpoints["home"]);

  return (
    <>
      <NextPageContext.Provider
        value={{
          nextPage: nextPage,
          setNextPage: (value) => {
            setNextPage(value);
          },
          resetNextPage: () => {
            setNextPage(endpoints["home"]);
          },
        }}
      >
        <RouterProvider router={router} />
      </NextPageContext.Provider>
    </>
  );
}

export default App;
