import { useQuery } from "@tanstack/react-query";
import ApiService from "../services/apiService";
import { Product } from "./useProducts";

const apiService = new ApiService<Product>("/products");

const useProduct = (id: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => apiService.get(id),
    staleTime: 60 * 60 * 1000, // 1h
  });
  return { data, isLoading, error };
};

export default useProduct;
