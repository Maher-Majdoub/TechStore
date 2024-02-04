import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tokens } from "./useAuthorization";
import apiClient from "../services/apiClient";

const useRefreshToken = () => {
  const queryClient = useQueryClient();
  const {
    mutate: refreshToken,
    isSuccess: isRefreshSuccess,
    isPending: isRefreshPending,
    isError: isRefreshError,
  } = useMutation<{ access: string }, Error, { refresh: string }, Tokens>({
    mutationFn: (data) =>
      apiClient.post("/auth/jwt/refresh", data).then((res) => res.data),
    onSuccess: ({ access }) =>
      queryClient.setQueryData<Tokens>(["auth"], (oldTokens) => {
        if (oldTokens === undefined) return undefined;
        return { ...oldTokens, access: access };
      }),
  });

  return { refreshToken, isRefreshSuccess, isRefreshPending, isRefreshError };
};

export default useRefreshToken;
