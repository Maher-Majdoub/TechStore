import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tokens } from "./useAuthorization";
import apiClient from "../services/apiClient";

const useLogin = () => {
  const queryClient = useQueryClient();

  const {
    mutate: login,
    isSuccess: isLoginSuccess,
    isPending: isLoginPending,
    isError: isLoginError,
  } = useMutation<Tokens, Error, { username: string; password: string }>({
    mutationFn: (data) =>
      apiClient.post("/auth/jwt/create/", data).then((res) => res.data),
    onSuccess: (tokens) => {
      queryClient.setQueryData<Tokens>(["auth"], tokens);
      queryClient.invalidateQueries({ queryKey: ["wishes"] });
      queryClient.invalidateQueries({ queryKey: ["customer"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  return { login, isLoginSuccess, isLoginPending, isLoginError };
};

export default useLogin;
