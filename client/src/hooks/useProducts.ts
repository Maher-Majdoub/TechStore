import { useQuery } from "@tanstack/react-query";
import ApiService from "../services/apiService";

interface Product {
  id: number;
  name: string;
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
