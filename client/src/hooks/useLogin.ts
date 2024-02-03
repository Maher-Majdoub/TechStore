import { useMutation } from "@tanstack/react-query";
import ApiService from "../services/apiService";

interface Response {
  access: string;
  refresh: string;
}

const apiService = new ApiService<Response>("/auth/jwt/create");

const useLogin = () => {
  const {
    mutate: login,
    data,
    isError,
  } = useMutation({
    mutationFn: (data: { username: string; password: string }) =>
      apiService.post(data),
  });

  return { login, data, isError };
};

export default useLogin;
