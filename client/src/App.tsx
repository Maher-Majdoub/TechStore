import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { NextPageContext } from "./contexts";
import { endpoints } from "./constants";
import { useEffect, useState } from "react";
import useAuthorization from "./hooks/useAuthorization";
import useRefreshToken from "./hooks/useRefreshToken";

function App() {
  const [nextPage, setNextPage] = useState(endpoints["home"]);

  const { isAccessExpired, isRefreshExpired, refresh } = useAuthorization();
  const { refreshToken } = useRefreshToken();

  useEffect(() => {
    if (isAccessExpired && !isRefreshExpired) {
      refreshToken({ refresh: refresh as string });
    }
  }, [isAccessExpired, isRefreshExpired]);

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
