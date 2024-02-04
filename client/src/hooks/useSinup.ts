import { useMutation } from "@tanstack/react-query";
import apiClient from "../services/apiClient";

interface Data {
  email: string;
  username: string;
  password: string;
}

const useSignup = () => {
  const {
    mutate: signup,
    isSuccess: isSignupSuccess,
    isPending: isSignupPending,
    isError: isSignupError,
  } = useMutation<Data, Error, Data>({
    mutationFn: (data) => apiClient.post("/auth/users/", data),
  });

  return { signup, isSignupSuccess, isSignupPending, isSignupError };
};

export default useSignup;
