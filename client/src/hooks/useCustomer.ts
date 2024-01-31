import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ApiService from "../services/apiService";
import { Product } from "./useProducts";
import useAuthorization from "./useAuthorization";
import apiClient from "../services/apiClient";

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface Address {
  id?: number;
  first_name: string;
  last_name: string;
  company: string;
  phone_number: string;
  address: string;
  country: string;
  state: string;
  city: string;
  region: string;
  street_number: string;
  postal_code: number;
  description: string;
  is_default_billing_address: boolean;
  is_default_shipping_address: boolean;
}

interface Wish {
  id: number;
  product: Product;
  created_at: Date;
}

interface Compare extends Wish {}

export interface Customer {
  id: number;
  user: User;
  phone: string;
  birth_date: string;
  membership: string;
  addresses: Address[];
  wish_list: Wish[];
  compare_list: Compare[];
}

const apiService = new ApiService<Customer>("customers");

const useCustomer = () => {
  const access_token = useAuthorization();
  const queryClient = useQueryClient();

  if (!access_token)
    return {
      customer: null,
      isLoading: false,
      isError: true,
      addAddress: () => {},
      deleteAddress: () => {},
      editAddress: () => {},
    };

  const AUTHORIZATION = `JWT ${access_token}`;

  const {
    data: customer,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["customer"],
    queryFn: () =>
      apiService.get("me", {
        headers: {
          Authorization: `JWT ${access_token}`,
        },
      }),
    staleTime: 60 * 60 * 1000, // 1h
  });

  const AddAddressMutation = useMutation<Address, Error, Address>({
    mutationFn: (address) => {
      console.log(address);

      return apiClient
        .post("store/customers/me/addresses/", address, {
          headers: { Authorization: AUTHORIZATION },
        })
        .then((res) => res.data);
    },

    onMutate: (address) => {
      const oldCustomer = queryClient.getQueryData<Customer>(["customer"]);
      queryClient.setQueryData<Customer>(["customer"], (oldCustomer) => {
        if (oldCustomer === undefined) return undefined;
        const oldAddresses = [] as Address[];
        oldCustomer.addresses.map((a) => {
          oldAddresses.push({
            ...a,
            is_default_billing_address: address.is_default_billing_address
              ? false
              : a.is_default_billing_address,
            is_default_shipping_address: address.is_default_shipping_address
              ? false
              : a.is_default_shipping_address,
          });
        });
        return {
          ...oldCustomer,
          addresses: [...oldAddresses, { ...address, id: -1 }],
        };
      });
      return oldCustomer;
    },

    onSuccess: (address) => {
      queryClient.setQueryData<Customer>(["customer"], (oldCustomer) => {
        if (oldCustomer === undefined) return undefined;
        const newAddresses = [] as Address[];
        oldCustomer.addresses.forEach((a) => {
          if (a.id === -1) newAddresses.push(address);
          else newAddresses.push(a);
        });
        return {
          ...oldCustomer,
          addresses: newAddresses,
        };
      });
    },

    onError: (error, _, oldCustomer) => {
      console.log(error);
      queryClient.setQueryData(["customer"], () => oldCustomer);
    },
  });

  const DeleteAddressMutation = useMutation<
    {},
    Error,
    { addressId: number },
    Customer
  >({
    mutationFn: ({ addressId }) =>
      apiClient
        .delete(`store/customers/me/addresses/${addressId}`, {
          headers: { Authorization: AUTHORIZATION },
        })
        .then((res) => res.data),

    onMutate: ({ addressId }) => {
      const oldCustomer = queryClient.getQueryData<Customer>(["customer"]);
      queryClient.setQueryData<Customer>(["customer"], (oldCustomer) => {
        if (oldCustomer === undefined) return undefined;
        return {
          ...oldCustomer,
          addresses: oldCustomer.addresses.filter(
            (address) => address.id !== addressId
          ),
        };
      });
      return oldCustomer;
    },

    onError: (error, _, oldCustomer) => {
      console.error(error);
      queryClient.setQueryData<Customer>(["customer"], oldCustomer);
    },
  });

  const EditAddressMutation = useMutation<
    Address,
    Error,
    { id: number; newAddress: Address },
    Customer
  >({
    mutationFn: ({ id, newAddress }) =>
      apiClient
        .put(`/store/customers/me/addresses/${id}/`, newAddress, {
          headers: { Authorization: AUTHORIZATION },
        })
        .then((res) => res.data),

    onMutate: ({ id, newAddress }) => {
      const oldCustomer = queryClient.getQueryData<Customer>(["customer"]);
      queryClient.setQueryData<Customer>(["customer"], (oldCustomer) => {
        if (oldCustomer === undefined) return undefined;
        const newAddresses = [] as Address[];
        oldCustomer.addresses.map((address) => {
          if (address.id === id) newAddresses.push({ id: id, ...newAddress });
          else
            newAddresses.push({
              ...address,
              is_default_billing_address: newAddress.is_default_billing_address
                ? false
                : address.is_default_billing_address,
              is_default_shipping_address:
                newAddress.is_default_shipping_address
                  ? false
                  : address.is_default_shipping_address,
            });
        });
        return {
          ...oldCustomer,
          addresses: newAddresses,
        };
      });
      return oldCustomer;
    },

    onError: (error, _, oldCustomer) => {
      console.log(error);
      queryClient.setQueryData<Customer>(["customer"], oldCustomer);
    },
  });

  return {
    customer,
    isLoading,
    isError,
    addAddress: AddAddressMutation.mutate,
    deleteAddress: DeleteAddressMutation.mutate,
    editAddress: EditAddressMutation.mutate,
  };
};

export default useCustomer;
