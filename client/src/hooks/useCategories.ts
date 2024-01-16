import { useQuery } from "@tanstack/react-query";
import ApiService from "../services/apiService";

export interface Category {
  id: number;
  name: string;
  thumbnail: string;
  sub_categories: Category[];
}

const apiService = new ApiService<Category>("/categories");

const useCategories = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: () => apiService.getPage(),
    staleTime: 24 * 60 * 60 * 1000, // 24h
  });

  return { data, isLoading, error };
};

export default useCategories;
