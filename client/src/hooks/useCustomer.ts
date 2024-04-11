import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ApiService from "../services/apiService";
import { Product } from "./useProducts";
import useAuthorization from "./useAuthorization";
import apiClient from "../services/apiClient";
import { toast } from "react-toastify";

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

interface PersonalInfos {
  first_name: string;
  last_name: string;
  phone: string;
  birth_date: string;
}

export interface Customer extends PersonalInfos {
  id: number;
  user: { id: number; email: string };
  membership: string;
  addresses: Address[];
  wish_list: Wish[];
  compare_list: Compare[];
}

interface ChangePasswordError {
  response: {
    data: {
      current_password: string[];
      new_password: string[];
    };
  };
}

interface ChangeUserNameError {
  response: {
    data: {
      current_password: string[];
      new_username: string[];
    };
  };
}

interface ChangePersonalInfosError {
  response: {
    data: {
      first_name: string[];
      last_name: string[];
      phone: string[];
      birth_date: string[];
    };
  };
}

const apiService = new ApiService<Customer>("customers");

const useCustomer = () => {
  const { access } = useAuthorization();
  const queryClient = useQueryClient();

  if (!access)
    return {
      customer: undefined,
      isLoading: false,
      isError: true,
      addAddress: () => {},
      deleteAddress: () => {},
      editAddress: () => {},
      isAddAddressSuccess: false,
      isAddAddressPending: false,
      isAddAddressError: false,
      isDeleteAddressSuccess: false,
      isDeleteAddressPending: false,
      isDeleteAddressError: false,
      isEditAddressSuccess: false,
      isEditAddressPending: false,
      isEditAddressError: false,
      changePassword: () => {},
      isChangingPasswordPending: false,
      isPasswordChangingError: false,
      isPasswordChangingSuccess: false,
      changingPasswordError: {} as ChangePasswordError,
      changeUsername: () => {},
      isChangingUsernameSuccess: false,
      isChangingUsernamePending: false,
      isChangingUsernameError: false,
      changingUsernameError: {} as ChangeUserNameError,
      changePersonalInfos: () => {},
      isChangingPersonalInfosSuccess: false,
      isChangingPersonalInfosPending: false,
      isChangingPersonalInfosError: false,
      changingPersonalInfosError: {} as ChangePersonalInfosError,
    };

  const AUTHORIZATION = `JWT ${access}`;

  const {
    data: customer,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["customer"],
    queryFn: () =>
      apiService.get("me", {
        headers: {
          Authorization: `JWT ${access}`,
        },
      }),
    staleTime: 60 * 60 * 1000, // 1h
  });

  const AddAddressMutation = useMutation<Address, Error, Address>({
    mutationFn: (address) =>
      apiClient
        .post("store/customers/me/addresses/", address, {
          headers: { Authorization: AUTHORIZATION },
        })
        .then((res) => res.data),

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
      toast.success("Adress added successfuly");
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

    onError: (_, __, oldCustomer) => {
      toast.error("Something went wrong while adding address");
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
      toast.success("Address removed successfuly");
      return oldCustomer;
    },

    onError: (_, __, oldCustomer) => {
      queryClient.setQueryData<Customer>(["customer"], oldCustomer);
      toast.error("Something went wrong while removing address");
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
      toast.success("Address updated successfuly");
      return oldCustomer;
    },

    onError: (_, __, oldCustomer) => {
      queryClient.setQueryData<Customer>(["customer"], oldCustomer);
      toast.error("Something went wrong while updating address");
    },
  });

  const {
    mutate: changePassword,
    isSuccess: isChangingPasswordSuccess,
    isPending: isChangingPasswordPending,
    isError: isChangingPasswordError,
    error: changingPasswordError,
  } = useMutation<
    {},
    ChangePasswordError,
    { currentPassword: string; newPassword: string }
  >({
    mutationFn: ({ currentPassword, newPassword }) =>
      apiClient
        .post(
          "/auth/users/set_password/",
          {
            current_password: currentPassword,
            new_password: newPassword,
          },
          { headers: { Authorization: AUTHORIZATION } }
        )
        .then((res) => res.data),
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
  });

  const {
    mutate: changeUsername,
    isSuccess: isChangingUsernameSuccess,
    isPending: isChangingUsernamePending,
    isError: isChangingUsernameError,
    error: changingUsernameError,
  } = useMutation<
    {},
    ChangeUserNameError,
    { currentPassword: string; newUsername: string }
  >({
    mutationFn: ({ currentPassword, newUsername }) =>
      apiClient
        .post(
          "/auth/users/set_username/",
          {
            current_password: currentPassword,
            new_username: newUsername,
          },
          { headers: { Authorization: AUTHORIZATION } }
        )
        .then((res) => res.data),
    onSuccess: () => {
      toast.success("Username changed successfully");
    },
  });

  const {
    mutate: changePersonalInfos,
    isSuccess: isChangingPersonalInfosSuccess,
    isPending: isChangingPersonalInfosPending,
    isError: isChangingPersonalInfosError,
    error: changingPersonalInfosError,
  } = useMutation<{}, ChangePersonalInfosError, PersonalInfos, Customer>({
    mutationFn: (infos) =>
      apiClient.put("/store/customers/me/", infos, {
        headers: { Authorization: AUTHORIZATION },
      }),
    onMutate: () => {
      return queryClient.getQueryData(["customer"]);
    },
    onSuccess: (_, infos, oldCustomer) => {
      queryClient.setQueryData(["customer"], { ...oldCustomer, ...infos });
      toast.success("Personal infos changed successfully");
    },
  });

  return {
    customer,
    isLoading,
    isError,
    addAddress: AddAddressMutation.mutate,
    isAddAddressSuccess: AddAddressMutation.isSuccess,
    isAddAddressPending: AddAddressMutation.isPending,
    isAddAddressError: AddAddressMutation.isError,
    deleteAddress: DeleteAddressMutation.mutate,
    isDeleteAddressSuccess: DeleteAddressMutation.isSuccess,
    isDeleteAddressPending: DeleteAddressMutation.isPending,
    isDeleteAddressError: DeleteAddressMutation.isError,
    editAddress: EditAddressMutation.mutate,
    isEditAddressSuccess: EditAddressMutation.isSuccess,
    isEditAddressPending: EditAddressMutation.isPending,
    isEditAddressError: EditAddressMutation.isError,
    changePassword,
    isChangingPasswordSuccess,
    isChangingPasswordPending,
    isChangingPasswordError,
    changingPasswordError,
    changeUsername,
    isChangingUsernameSuccess,
    isChangingUsernamePending,
    isChangingUsernameError,
    changingUsernameError,
    changePersonalInfos,
    isChangingPersonalInfosSuccess,
    isChangingPersonalInfosPending,
    isChangingPersonalInfosError,
    changingPersonalInfosError,
  };
};

export default useCustomer;
