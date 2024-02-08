import { useState } from "react";
import useCustomer, { Address } from "../../hooks/useCustomer";
import ActionBtn from "../ActionBtn/ActionBtn";
import Button from "../Button/Button";
import AddressDisplayer from "./AddressDisplayer";
import styles from "./styles.module.css";
import AddAddress from "./AddEditAddress";

const AddressBook = () => {
  const { customer, deleteAddress } = useCustomer();
  const defaultShippingAddress = customer?.addresses.find(
    (address) => address.is_default_shipping_address
  );
  const defaultBillingAddress = customer?.addresses.find(
    (address) => address.is_default_billing_address
  );

  const [section, setSection] = useState<"main" | "addAddress" | "editAddress">(
    "main"
  );

  const [addressToEdit, setAddressToEdit] = useState({} as Address);

  return (
    <>
      {customer && (
        <div>
          {section === "main" && (
            <div className={styles.container}>
              <div>
                <div className={styles.titleContainer}>
                  <h2>Default addresses</h2>
                </div>
                <div className={styles.sectionsContainer}>
                  <AddressDisplayer
                    address={defaultBillingAddress}
                    name="billing address"
                    onEdit={() => {
                      setAddressToEdit(defaultBillingAddress as Address);
                      setSection("editAddress");
                    }}
                  />
                  <AddressDisplayer
                    address={defaultShippingAddress}
                    name="shipping address"
                    onEdit={() => {
                      setAddressToEdit(defaultShippingAddress as Address);
                      setSection("editAddress");
                    }}
                  />
                </div>
              </div>
              <div>
                <div className={styles.titleContainer}>
                  <h2>All Addresses</h2>
                </div>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customer.addresses.map((address) => (
                      <tr key={address.id}>
                        <td>{address.first_name}</td>
                        <td>{address.last_name}</td>
                        <td>{address.address}</td>
                        <td className={styles.actions}>
                          <ActionBtn
                            action="delete"
                            onClick={() => {
                              deleteAddress({ addressId: address.id || -1 });
                            }}
                          />
                          <ActionBtn
                            action="modify"
                            onClick={() => {
                              setAddressToEdit(address);
                              setSection("editAddress");
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className={styles.btnContainer}>
                  <Button
                    onClick={() => {
                      setSection("addAddress");
                    }}
                  >
                    Add Address
                  </Button>
                </div>
              </div>
            </div>
          )}
          {section === "addAddress" && (
            <AddAddress
              afterSubmition={() => {
                setSection("main");
              }}
            />
          )}
          {section == "editAddress" && (
            <AddAddress
              afterSubmition={() => {
                setSection("main");
              }}
              address={addressToEdit}
            />
          )}
        </div>
      )}
    </>
  );
};

export default AddressBook;
