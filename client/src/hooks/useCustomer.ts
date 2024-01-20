import { useQuery } from "@tanstack/react-query";
import ApiService from "../services/apiService";

interface Customer {
  id: number;
  phone: string;
  birth_date: string;
  membership: string;
}

const apiService = new ApiService<Customer>("customers");

const useCustomer = () => {
  const {
    data: customer,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["customer"],
    queryFn: () =>
      apiService.get("me", {
        headers: {
          Authorization:
            "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE5NDA5MjExLCJpYXQiOjE3MDQ4OTQwMTEsImp0aSI6ImQyNTJiNzI2MWNlZTQzOGNiN2VjMTIzNDYzMGZjNGMzIiwidXNlcl9pZCI6NjAxfQ.e0zoGzRHYBRuZGOjkra0pLtzMdHCpUAZISEI3sfb_QY",
        },
      }),
    staleTime: 60 * 60 * 1000, // 1h
  });
  return { customer, isLoading, error };
};

export default useCustomer;
