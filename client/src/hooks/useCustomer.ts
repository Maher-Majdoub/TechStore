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

interface Address {
  id: number;
  first_name: string;
  last_name: string;
  company: string;
  phone_number: string;
  addresss: string;
  country: string;
  state: string;
  city: string;
  region: string;
  street_number: number;
  postal_code: number;
  description: string;
  is_default_billing_address: boolean;
  is_default_shipping_address: boolean;
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
  addresses: Address[];
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
