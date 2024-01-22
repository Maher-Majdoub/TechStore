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

interface AddResponse {
  data: { id: number; product: number; quantity: number };
}

const fetchCart = async () => {
  const apiService = new ApiService<Cart>("/store/carts/");
  return await apiService.post({});
  //   const apiService = new ApiService<Cart>("/store/carts/");
  //   const stored_cart = localStorage.getItem("cart");
  //   if (stored_cart === null) {
  //     const newCart = await apiService.post({});
  //     localStorage.setItem("cart", JSON.stringify(newCart));
  //     return newCart;
  //   }
  // //   return JSON.parse(stored_cart);
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

  const addToCartMutation = useMutation({
    mutationFn: ({
      product,
      quantity,
    }: {
      product: Product;
      quantity: number;
    }) => {
      if (cart)
        return apiClient.post<any, AddResponse>(
          `/store/carts/${cart.id}/items/`,
          {
            product: product.id,
            quantity: quantity,
          }
        );
      return apiClient.post<any, AddResponse>("/");
    },

    onMutate({ product, quantity }) {
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
  });

  return { cart, isLoading, isError, addToCart: addToCartMutation.mutate };
};

export default useCart;
