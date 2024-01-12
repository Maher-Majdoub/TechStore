import { useQuery } from "@tanstack/react-query";
import ApiService from "../services/apiService";

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

const useProducts = (page?: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: page ? ["products", page] : ["products"],
    queryFn: () => apiService.getPage(page),
    staleTime: 60 * 60 * 1000, // 1h
  });
  return { data, isLoading, error };
};

export default useProducts;
