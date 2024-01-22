import { useQuery } from "@tanstack/react-query";
import ApiService from "../services/apiService";
import { Product } from "./useProducts";

interface CartItem {
  id: number;
  product: Product;
  quatity: number;
}

interface Cart {
  id: string;
  items: CartItem[];
}

const apiService = new ApiService<Cart>("/store/carts/");

const fetchCart = async () => {
  const stored_cart = localStorage.getItem("cart");
  if (stored_cart === null) {
    const newCart = await apiService.post({});
    localStorage.setItem("cart", JSON.stringify(newCart));
    return newCart;
  }
  return JSON.parse(stored_cart);
};

const useCart = () => {
  const {
    data: cart,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });

  return { cart, isLoading, isError };
};

export default useCart;
