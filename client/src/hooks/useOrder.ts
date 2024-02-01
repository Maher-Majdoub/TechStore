import { useQuery } from "@tanstack/react-query";
import { Address } from "./useCustomer";
import ApiService from "../services/apiService";
import useAuthorization from "./useAuthorization";

export enum OrderStatus {
  COD = "Cash On Delivery",
}

export enum PaymentStatus {
  P = "Pending",
}

export enum ShippingMethod {
  SS = "standard shipping",
}

interface OrderItem {
  id: number;
  product: {
    id: number;
    name: string;
    slug: string;
    reference: string;
    description: string;
    unit_price: number;
  };
  discount: number;
  final_unit_price: number;
  quantity: number;
}

export interface Order {
  id: number;
  created_at: Date;
  status: OrderStatus;
  payment_status: PaymentStatus;
  billing_address: Address;
  shipping_address: Address;
  shipping_method: ShippingMethod;
  items: OrderItem[];
}

const UseOrder = () => {
  const access_token = useAuthorization();
  const apiService = new ApiService<Order>("customers/me/orders/");

  const {
    data: orders,
    isLoading: isFetchingOrdersLoading,
    isError: isFetchingOrdersError,
  } = useQuery({
    queryFn: () =>
      apiService.getPage({
        headers: { Authorization: `JWT ${access_token}` },
      }),
    queryKey: ["orders"],
  });

  return { orders, isFetchingOrdersLoading, isFetchingOrdersError };
};

export default UseOrder;
