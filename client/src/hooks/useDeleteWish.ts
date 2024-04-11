import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/apiClient";
import useAuthorization from "./useAuthorization";
import { Wish } from "./useWish";
import { toast } from "react-toastify";

const useDeleteWish = () => {
  const { access } = useAuthorization();
  const AUTHORIZATION = `JWT ${access}`;
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

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishes"] });
      toast.success("Wish removed successfuly");
    },

    onError: () => {
      toast.error(
        "Sorry! There's an issue with our server. Please try again later.",
        { autoClose: 5000 }
      );
    },
  });

  return { deleteWish, isSuccess, isPending, isError };
};

export default useDeleteWish;
