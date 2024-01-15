import { useQuery } from "@tanstack/react-query";
import ApiService from "../services/apiService";
import { AxiosRequestConfig } from "axios";

export interface Product {
  id: number;
  category: {
    id: number;
    nmae: string;
  };
  name: string;
  reference: string;
  description: string;
  unit_price: number;
  inventory: number;
  configuration: {
    id: number;
    variation: string;
    value: string;
  }[];
  dicounts: string[];
  images: {
    id: number;
    image: string;
  }[];
}

const apiService = new ApiService<Product>("/products");

const useProducts = (config: AxiosRequestConfig = {}) => {
  console.log("lahne", config);
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", config],
    queryFn: () => apiService.get(config),
    staleTime: 60 * 60 * 1000, // 1h
  });
  return { data, isLoading, error };
};

export default useProducts;
