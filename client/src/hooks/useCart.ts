import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ApiService from "../services/apiService";
import { Product } from "./useProducts";
import apiClient from "../services/apiClient";

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

interface Cart {
  id: string;
  items: CartItem[];
}

interface TResponse {
  data: { id: number; product: number; quantity: number };
}

interface TPost {
  product: Product;
  quantity: number;
}

const fetchCart = async () => {
  const apiService = new ApiService<Cart>("/store/carts/");
  return await apiService.post({});
};

const useCart = () => {
  const queryClient = useQueryClient();

  const {
    data: cart,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
    staleTime: 24 * 60 * 60 * 1000,
  });

  const addToCartMutation = useMutation<TResponse, Error, TPost, Cart>({
    mutationFn: ({ product, quantity }) => {
      return apiClient.post(`/store/carts/${cart?.id}/items/`, {
        product: product.id,
        quantity: quantity,
      });
    },

    onMutate({ product, quantity }) {
      const oldCart = queryClient.getQueryData<Cart>(["cart"]) || ({} as Cart);

      queryClient.setQueryData(["cart"], (oldCart: Cart | undefined) => {
        if (oldCart === undefined) return undefined;
        for (const item of oldCart.items) {
          if (item.product.id === product.id) {
            const newItems = oldCart.items.filter(
              (itm) => itm.product.id !== item.product.id
            );
            item.quantity += quantity;
            newItems.push(item);
            return {
              id: oldCart.id,
              items: newItems,
            };
          }
        }
        return {
          id: oldCart.id,
          items: [
            ...oldCart.items,
            { id: -1, product: product, quantity: quantity },
          ],
        };
      });

      return oldCart;
    },

    onSuccess(data) {
      queryClient.setQueryData(["cart"], (oldCart: Cart | undefined) => {
        if (oldCart === undefined) return undefined;
        const newItems = [] as CartItem[];

        oldCart.items.forEach((item) => {
          if (item.product.id === data.data.product) {
            newItems.push({
              id: data.data.id,
              product: item.product,
              quantity: item.quantity,
            });
          } else newItems.push(item);
        });

        return {
          id: oldCart.id,
          items: newItems,
        };
      });
    },

    onError(error, _, oldCart) {
      queryClient.setQueryData(["cart"], () => {
        console.error(error);
        queryClient.setQueryData(["cart"], () => oldCart);
      });
    },
  });

  const DeleteFromCartMutation = useMutation<
    {},
    Error,
    { itemId: number },
    Cart
  >({
    mutationFn: ({ itemId }) =>
      apiClient.delete(`/store/carts/${cart?.id}/items/${itemId}`),
    onMutate: ({ itemId }) => {
      const oldCart = queryClient.getQueryData<Cart>(["cart"]);
      queryClient.setQueryData<Cart>(["cart"], (oldCart) => {
        if (oldCart === undefined) return undefined;
        return {
          id: oldCart.id,
          items: oldCart.items.filter((item) => item.id !== itemId),
        };
      });
      return oldCart;
    },

    onError(error, _, cart) {
      console.error(error);
      queryClient.setQueryData(["cart"], cart);
    },
  });

  return {
    cart,
    isLoading,
    isError,
    addToCart: addToCartMutation.mutate,
    deleteFromCart: DeleteFromCartMutation.mutate,
  };
};

export default useCart;
