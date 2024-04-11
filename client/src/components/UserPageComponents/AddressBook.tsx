import { useContext, useEffect } from "react";
import useCustomer, { Address } from "../../hooks/useCustomer";
import ActionBtn from "../ActionBtn/ActionBtn";
import Button from "../Button/Button";
import AddressDisplayer from "./AddressDisplayer";
import styles from "./styles.module.css";
import AddAddress from "./AddEditAddress";
import { userAccountEndPoints } from "../../constants";
import { useNavigate } from "react-router-dom";
import { AddressToEditContext } from "../../contexts";
import { toast } from "react-toastify";

interface Props {
  add?: boolean;
  edit?: boolean;
}

const AddressBook = ({ add = false, edit = false }: Props) => {
  const { customer, deleteAddress } = useCustomer();
  const navigate = useNavigate();

  const defaultShippingAddress = customer?.addresses.find(
    (address) => address.is_default_shipping_address
  );

  const defaultBillingAddress = customer?.addresses.find(
    (address) => address.is_default_billing_address
  );

  const { address: addressToEdit, setAddress: setAddressToEdit } =
    useContext(AddressToEditContext);

  useEffect(() => {
    if (edit && addressToEdit === undefined) {
      toast.warn("Please select address to edit first");
      navigate(userAccountEndPoints["address_book"]);
    }
  }, []);

  return (
    <>
      {customer && (
        <div>
          {!add && !edit && (
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
                      navigate(userAccountEndPoints["edit_address"]);
                    }}
                  />
                  <AddressDisplayer
                    address={defaultShippingAddress}
                    name="shipping address"
                    onEdit={() => {
                      setAddressToEdit(defaultShippingAddress as Address);
                      navigate(userAccountEndPoints["edit_address"]);
                    }}
                  />
                </div>
              </div>
              <div>
                <div className={styles.titleContainer}>
                  <h2>All Addresses</h2>
                </div>
                {customer.addresses && customer.addresses.length > 0 ? (
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
                                navigate(userAccountEndPoints["edit_address"]);
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <span>You haven't provided any address yet.</span>
                )}
                <div className={styles.btnContainer}>
                  <Button
                    onClick={() => {
                      navigate(userAccountEndPoints["add_address"]);
                    }}
                  >
                    Add Address
                  </Button>
                </div>
              </div>
            </div>
          )}
          {add && <AddAddress />}
          {edit && <AddAddress address={addressToEdit} />}
        </div>
      )}
    </>
  );
};

export default AddressBook;
