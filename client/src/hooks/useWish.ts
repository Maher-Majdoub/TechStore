import { useQuery } from "@tanstack/react-query";
import ApiService from "../services/apiService";
import useAuthorization from "./useAuthorization";
import { Product } from "./useProducts";

export interface Wish {
  id: number;
  product: Product;
  created_at: Date;
}

const useWish = (page: number = 1, pageSize: number = 10) => {
  const apiService = new ApiService<Wish>("customers/me/wishlist/");
  const { access } = useAuthorization();
  const AUTHORIZATION = `JWT ${access}`;

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["wishes", page, pageSize],
    queryFn: () =>
      apiService.getPage({
        params: { limit: pageSize, offset: (page - 1) * pageSize },
        headers: { Authorization: AUTHORIZATION },
      }),
    staleTime: 1000 * 60 * 60 * 24, //24h
    retry: 1,
  });

  return { data, isSuccess, isLoading, isError };
};

export default useWish;
