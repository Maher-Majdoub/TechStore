import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ApiService from "../services/apiService";
import { Product } from "./useProducts";
import apiClient from "../services/apiClient";

interface CartItem {
  id: number;
  product: Product;
  quatity: number;
}

interface Cart {
  id: string;
  items: CartItem[];
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
        return apiClient.post(`/store/carts/${cart.id}/items/`, {
          product: product.id,
          quantity: quantity,
        });
      return apiClient.post("/");
    },

    onMutate({ product, quantity }) {
      queryClient.setQueryData(["cart"], (oldCart: Cart | undefined) => {
        if (!oldCart) return undefined;
        return {
          id: oldCart.id,
          items: [
            ...oldCart.items,
            { id: -1, product: product, quantity: quantity },
          ],
        };
      });
    },
  });

  return { cart, isLoading, isError, addToCart: addToCartMutation.mutate };
};

export default useCart;
