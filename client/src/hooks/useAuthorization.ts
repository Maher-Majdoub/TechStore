import { useQueryClient } from "@tanstack/react-query";
import { useJwt } from "react-jwt";

export interface Tokens {
  access?: string;
  refresh?: string;
}

const useAuthorization = () => {
  const queryClient = useQueryClient();
  const tokens = queryClient.getQueryData<Tokens>(["auth"]);

  if (tokens === undefined)
    return {
      access: undefined,
      refresh: undefined,
      isAccessExpired: true,
      isRefreshExpired: true,
    };

  const { access, refresh } = tokens;

  let accessExpired = true;
  let refreshExpired = true;

  const { isExpired: isAccessExpired } = useJwt(access || "");
  const { isExpired: isRefreshExpired } = useJwt(refresh || "");

  if (!isAccessExpired && access) accessExpired = false;
  if (!isRefreshExpired && refresh) refreshExpired = false;

  return {
    access: access,
    refresh: refresh,
    isAccessExpired: accessExpired,
    isRefreshExpired: refreshExpired,
  };
};

export default useAuthorization;
