import { createContext } from "react";
import { Address } from "./hooks/useCustomer";

interface NextPageContextType {
  nextPage: string;
  setNextPage(value: string): void;
  resetNextPage(): void;
}

export const NextPageContext = createContext<NextPageContextType>({
  nextPage: "",
  setNextPage: () => {},
  resetNextPage: () => {},
});

interface AddressToEditContextType {
  address: Address;
  setAddress(address: Address): void;
}

export const AddressToEditContext = createContext<AddressToEditContextType>({
  address: {} as Address,
  setAddress: () => {},
});
