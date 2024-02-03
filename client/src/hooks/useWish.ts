import { useQuery } from "@tanstack/react-query";
import ApiService from "../services/apiService";
import useAuthorization from "./useAuthorization";
import { Product } from "./useProducts";

export interface Wish {
  id: number;
  product: Product;
  created_at: Date;
}

const useWish = (page: number = 1) => {
  const access_token = useAuthorization();
  const apiService = new ApiService<Wish>("customers/me/wishlist/");
  const AUTHORIZATION = `JWT ${access_token}`;

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["wishes", page],
    queryFn: () =>
      apiService
        .getPage({
          params: { page: page },
          headers: { Authorization: AUTHORIZATION },
        })
        .then((res) => res.results),
    staleTime: 1000 * 60 * 60 * 24, //24h
  });

  return { data, isSuccess, isLoading, isError };
};

export default useWish;
