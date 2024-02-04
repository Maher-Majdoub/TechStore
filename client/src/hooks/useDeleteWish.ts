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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["wishes"] }),
  });

  return { deleteWish, isSuccess, isPending, isError };
};

export default useDeleteWish;
