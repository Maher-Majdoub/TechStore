import { useQuery } from "@tanstack/react-query";
import ApiService from "../services/apiService";
import { AxiosRequestConfig } from "axios";

export interface Product {
  id: number;
  category: {
    id: number;
    name: string;
    slug: string;
    parent_category: {
      id: number;
      name: string;
      slug: string;
    };
  };
  name: string;
  slug: string;
  reference: string;
  description: string;
  unit_price: number;
  inventory: number;
  configurations: {
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

interface Props {
  category?: string;
  subCategory?: string;
  config?: AxiosRequestConfig;
}

const useProducts = ({ category, subCategory, config }: Props) => {
  const apiService = new ApiService<Product>(
    category && subCategory
      ? `categories/${category}/sub_categories/${subCategory}/products`
      : "products"
  );
  const { data, isLoading, error } = useQuery({
    queryKey:
      category && subCategory
        ? ["products", category, subCategory, config]
        : ["products", config],
    queryFn: () => apiService.getPage(config),
    staleTime: 60 * 60 * 1000, // 1h
  });
  return { data, isLoading, error };
};

export default useProducts;
