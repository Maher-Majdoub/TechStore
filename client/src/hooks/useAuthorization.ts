import { useJwt } from "react-jwt";

const useAuthorization = () => {
  const accessToken = localStorage.getItem("access_token");
  // const refreshToken = localStorage.getItem("refresh_token");

  if (accessToken) {
    const { isExpired } = useJwt(accessToken);
    if (!isExpired) return accessToken;
  }

  return null;
};

export default useAuthorization;
