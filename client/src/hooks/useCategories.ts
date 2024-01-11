import { useQuery } from "@tanstack/react-query";
import ApiService from "../services/apiService";

interface Category {
  id: number;
  name: string;
  thumbnail: string;
  sub_categories: Category[];
}

const apiService = new ApiService<Category>("/categories");

const useCategories = () => {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: apiService.getAll,
    staleTime: 24 * 60 * 60 * 1000, // 24h
  });

  return { categories, isLoading, error };
};

export default useCategories;
