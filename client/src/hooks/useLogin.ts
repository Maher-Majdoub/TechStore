import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tokens } from "./useAuthorization";
import apiClient from "../services/apiClient";
import { toast } from "react-toastify";

interface Error {
  response: {
    data: {
      detail: string;
    };
  };
}

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
      queryClient.resetQueries({ queryKey: ["customer"] });
      queryClient.resetQueries({ queryKey: ["orders"] });
      queryClient.resetQueries({ queryKey: ["wishes"] });
      toast.success("Login successful");
    },
    onError: (error) => {
      toast.error(error.response.data.detail, { autoClose: 2000 });
    },
  });

  return { login, isLoginSuccess, isLoginPending, isLoginError };
};

export default useLogin;
