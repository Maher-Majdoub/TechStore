import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ApiService from "../services/apiService";
import { Product } from "./useProducts";
import apiClient from "../services/apiClient";
import { toast } from "react-toastify";

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  itemsCount: number;
  total: number;
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
  const cart = await apiService.post({});
  var itemsCount = 0;
  var total = 0;
  if (cart?.items)
    for (const item of cart.items) {
      itemsCount += item.quantity;
      total +=
        item.quantity * item.product.unit_price * (1 - item.product.unit_price);
    }
  return { ...cart, itemsCount: itemsCount, total: total } as Cart;
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
              itemsCount: oldCart.itemsCount + quantity,
              total:
                oldCart.total +
                product.unit_price * quantity * (1 - product.discount),
            };
          }
        }
        return {
          ...oldCart,
          items: [
            ...oldCart.items,
            { id: -1, product: product, quantity: quantity },
          ],
          itemsCount: oldCart.itemsCount + quantity,
          total:
            oldCart.total +
            product.unit_price * quantity * (1 - product.discount),
        };
      });
      toast.success("Product added to your cart");
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
          ...oldCart,
          items: newItems,
        };
      });
    },

    onError(_, __, oldCart) {
      toast.error("Failed to add product to cart");
      queryClient.setQueryData(["cart"], () => oldCart);
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
        var newItemsCount = 0;
        var newTotal = 0;
        for (const item of oldCart.items)
          if (item.id !== itemId) {
            newItemsCount += item.quantity;
            newTotal +=
              item.quantity *
              item.product.unit_price *
              (1 - item.product.discount);
          }
        return {
          id: oldCart.id,
          items: oldCart.items.filter((item) => item.id !== itemId),
          itemsCount: newItemsCount,
          total: newTotal,
        };
      });
      return oldCart;
    },

    onError(_, __, cart) {
      queryClient.setQueryData(["cart"], cart);
    },
  });

  const clearCart = () => {
    queryClient.refetchQueries({ queryKey: ["cart"] });
  };

  return {
    cart,
    isLoading,
    isError,
    addToCart: addToCartMutation.mutate,
    isAddToCartSuccess: addToCartMutation.isSuccess,
    isAddToCartError: addToCartMutation.isError,
    deleteFromCart: DeleteFromCartMutation.mutate,
    clearCart,
  };
};

export default useCart;
