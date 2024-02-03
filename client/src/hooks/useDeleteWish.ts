import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/apiClient";
import useAuthorization from "./useAuthorization";
import { Wish } from "./useWish";

const useDeleteWish = () => {
  const access_token = useAuthorization();
  const AUTHORIZATION = `JWT ${access_token}`;
  const queryClient = useQueryClient();
  const {
    mutate: deleteWish,
    isSuccess,
    isPending,
    isError,
  } = useMutation<{}, Error, { wishId: number }, Wish[]>({
    mutationFn: ({ wishId }) =>
      apiClient.delete(`store/customers/me/wishlist/${wishId}`, {
        headers: {
          Authorization: AUTHORIZATION,
        },
      }),
    onMutate: ({ wishId }) => {
      const oldWishes = queryClient.getQueryData<Wish[]>(["wishes", 1]);
      queryClient.setQueryData<Wish[]>(["wishes", 1], (oldWishes) =>
        oldWishes?.filter((wish) => wish.id != wishId)
      );
      return oldWishes;
    },
    onError: (_, __, oldWishes) =>
      queryClient.setQueryData<Wish[]>(["wishes", 1], oldWishes),
  });

  return { deleteWish, isSuccess, isPending, isError };
};

export default useDeleteWish;
