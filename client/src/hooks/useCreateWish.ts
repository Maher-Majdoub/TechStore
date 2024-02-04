import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/apiClient";
import { Product } from "./useProducts";
import { Wish } from "./useWish";
import useAuthorization from "./useAuthorization";

const useCreateWish = () => {
  const access_token = useAuthorization();
  const AUTHORIZATION = `JWT ${access_token}`;
  const queryClient = useQueryClient();

  const {
    mutate: createWish,
    isSuccess,
    isPending,
    isError,
  } = useMutation<Wish, Error, { product: Product }, Wish[]>({
    mutationFn: ({ product }) =>
      apiClient
        .post(
          "store/customers/me/wishlist/",
          { product: product.id },
          {
            headers: { Authorization: AUTHORIZATION },
          }
        )
        .then((res) => res.data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishes"] });
    },
  });

  return { createWish, isSuccess, isPending, isError };
};

export default useCreateWish;
