import { useMutation } from "@tanstack/react-query";
import apiClient from "../services/apiClient";
import { toast } from "react-toastify";

interface Data {
  email: string;
  username: string;
  password: string;
}

interface Error {
  response: {
    data: {
      email?: string[];
      username?: string[];
      password?: string[];
    };
  };
}

const useSignup = () => {
  const {
    mutate: signup,
    isSuccess: isSignupSuccess,
    isPending: isSignupPending,
    isError: isSignupError,
    error: signupError,
  } = useMutation<Data, Error, Data>({
    mutationFn: (data) => apiClient.post("/auth/users/", data),
    onSuccess: () => {
      toast.success("Signup successful");
    },
  });

  return {
    signup,
    isSignupSuccess,
    isSignupPending,
    isSignupError,
    signupError,
  };
};

export default useSignup;
