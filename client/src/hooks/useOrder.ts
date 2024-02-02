import { useMutation, useQuery } from "@tanstack/react-query";
import { Address } from "./useCustomer";
import ApiService from "../services/apiService";
import useAuthorization from "./useAuthorization";
import apiClient from "../services/apiClient";

export enum OrderStatus {
  Pending = "PE",
  Processing = "PR",
  Shiped = "S",
  OutForDelivery = "OFD",
  Canceled = "C",
  Failed = "F",
  AwaitingPayment = "AP",
}

export enum PaymentMethod {
  CashOnDelivery = "COD",
  CreditCart = "CC",
  PayPal = "PP",
}

export enum PaymentStatus {
  Pending = "P",
  Confirmed = "C",
  Declined = "D",
}

export enum ShippingMethod {
  StandardShipping = "SS",
  FreeShipping = "FS",
  PickupInStore = "PS",
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
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  billing_address: Address;
  shipping_address: Address;
  shipping_method: ShippingMethod;
  items: OrderItem[];
}

interface CreateOrder {
  cart_id: string;
  billing_address: number;
  payment_method: PaymentMethod;
  shipping_address: number;
  shipping_method: ShippingMethod;
}

const UseOrder = () => {
  const access_token = useAuthorization();
  const apiService = new ApiService<Order>("customers/me/orders/");
  const AUTHORIZATION = `JWT ${access_token}`;

  const {
    data: orders,
    isLoading: isFetchingOrdersLoading,
    isError: isFetchingOrdersError,
  } = useQuery({
    queryFn: () =>
      apiService.getPage({
        headers: { Authorization: AUTHORIZATION },
      }),
    queryKey: ["orders"],
  });

  const {
    mutate: createOrder,
    isSuccess: isCreateOrderSuccess,
    isPending: isCreateOrderPending,
    isError: isCreateOrderEror,
  } = useMutation<{}, Error, CreateOrder>({
    mutationFn: (order) =>
      apiClient
        .post("/store/customers/me/orders/", order, {
          headers: { Authorization: AUTHORIZATION },
        })
        .then((res) => res.data),
  });

  return {
    orders,
    isFetchingOrdersLoading,
    isFetchingOrdersError,
    createOrder,
    isCreateOrderSuccess,
    isCreateOrderPending,
    isCreateOrderEror,
  };
};

export default UseOrder;
