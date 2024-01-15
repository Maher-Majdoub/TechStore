import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  {
    path: "/test",
    element: <TestPage />,
  },
]);

export default router;
