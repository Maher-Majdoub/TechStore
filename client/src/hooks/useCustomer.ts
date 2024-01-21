import { useQuery } from "@tanstack/react-query";
import ApiService from "../services/apiService";
import { Product } from "./useProducts";
import useAuthorization from "./useAuthorization";

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface Adress {
  id: number;
  is_default: boolean;
  state: string;
  city: string;
  postal_code: number;
  description: string;
}

interface Wish {
  id: number;
  product: Product;
  created_at: Date;
}

interface Compare extends Wish {}

export interface Customer {
  id: number;
  user: User;
  phone: string;
  birth_date: string;
  membership: string;
  adresses: Adress[];
  wish_list: Wish[];
  compare_list: Compare[];
}

const apiService = new ApiService<Customer>("customers");

const useCustomer = () => {
  const access_token = useAuthorization();

  if (!access_token) return { customer: null, isLoading: false, isError: true };

  const {
    data: customer,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["customer"],
    queryFn: () =>
      apiService.get("me", {
        headers: {
          Authorization: access_token && `JWT ${access_token}`,
        },
      }),
    staleTime: 60 * 60 * 1000, // 1h
  });
  return { customer, isLoading, isError };
};

export default useCustomer;
