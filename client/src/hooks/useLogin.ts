import { useMutation } from "@tanstack/react-query";
import ApiService from "../services/apiService";

const apiService = new ApiService("/auth/jwt/create");

const useLogin = () => {
  const {
    mutate: login,
    data,
    isError,
  } = useMutation({
    mutationFn: (data: any) => apiService.post(data),
  });

  return { login, data, isError };
};

export default useLogin;
