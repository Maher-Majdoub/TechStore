import { useQuery } from "@tanstack/react-query";
import ApiService from "../services/apiService";
import { AxiosRequestConfig } from "axios";

interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  parent_category: {
    id: number;
    name: string;
    slug: string;
  };
}

interface ProductConfiguration {
  id: number;
  variation: string;
  value: string;
}

interface ProductImage {
  id: number;
  image: string;
}

export interface ProductInfo {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface Product {
  id: number;
  category: ProductCategory;
  name: string;
  slug: string;
  reference: string;
  description: string;
  unit_price: number;
  discount: number;
  inventory: number;
  configurations: ProductConfiguration[];
  images: ProductImage[];
  infos: ProductInfo[];
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
