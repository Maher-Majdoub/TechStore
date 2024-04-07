import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/apiClient";
import { Product } from "./useProducts";
import { Wish } from "./useWish";
import useAuthorization from "./useAuthorization";
import { toast } from "react-toastify";

interface Error {
  response: {
    data: {
      product?: {
        error: string;
      };
    };
  };
}

const useCreateWish = () => {
  const { access } = useAuthorization();
  const AUTHORIZATION = `JWT ${access}`;
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
      toast.success("Wish added successfully");
      queryClient.invalidateQueries({ queryKey: ["wishes"] });
    },
    onError: (error) => {
      error.response.data.product
        ? toast.warn(error.response.data.product.error)
        : toast.error("Failed adding wish");
    },
  });

  return { createWish, isSuccess, isPending, isError };
};

export default useCreateWish;
