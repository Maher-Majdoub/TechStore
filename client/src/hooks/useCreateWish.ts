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
    onMutate: ({ product }) => {
      const oldWishes = queryClient.getQueryData<Wish[]>(["wishes", 1]);

      queryClient.setQueryData<Wish[]>(["wishes", 1], (oldWishes) => {
        if (oldWishes === undefined) return undefined;
        return [
          ...oldWishes,
          {
            id: -1,
            product: product,
            created_at: new Date(),
          } as Wish,
        ];
      });

      return oldWishes;
    },
    onSuccess: (wish, { product }) =>
      queryClient.setQueryData<Wish[]>(["wishes", 1], (oldWishes) => {
        if (oldWishes === undefined) return undefined;
        return oldWishes.map((currWish) => {
          if (currWish.product.id === product.id)
            return { ...currWish, id: wish.id, created_at: wish.created_at };
          else return currWish;
        });
      }),

    onError: (_, __, oldWishes) =>
      queryClient.setQueryData<Wish[]>(["wishes", 1], oldWishes),
  });

  return { createWish, isSuccess, isPending, isError };
};

export default useCreateWish;
