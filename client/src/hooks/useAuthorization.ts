import { useQueryClient } from "@tanstack/react-query";

export interface Tokens {
  access?: string;
  refresh?: string;
}

const useAuthorization = (): Tokens => {
  const queryClient = useQueryClient();
  const tokens = queryClient.getQueryData<Tokens>(["auth"]);
  return tokens ? tokens : { access: undefined, refresh: undefined };
};

export default useAuthorization;
