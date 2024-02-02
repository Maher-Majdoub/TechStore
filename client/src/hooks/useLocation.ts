import { useLocation as oldUseLocation } from "react-router-dom";

const useLocation = () => {
  let { pathname } = oldUseLocation();
  pathname = pathname.trim();

  if (pathname[0] === "/") pathname = pathname.slice(1);
  if (pathname[pathname.length - 1] === "/")
    pathname = pathname.slice(0, pathname.length - 1);

  return { pathname };
};

export default useLocation;
