import useCustomer from "../../hooks/useCustomer";
import ActionBtn from "../ActionBtn/ActionBtn";
import Button from "../Button/Button";
import AddressDisplayer from "./AddressDisplayer";
import styles from "./styles.module.css";

const AddressBook = () => {
  const { customer, deleteAddress } = useCustomer();
  const defaultShippingAddress = customer?.addresses.find(
    (address) => address.is_default_shipping_address
  );
  const defaultBillingAddress = customer?.addresses.find(
    (address) => address.is_default_billing_address
  );
  return (
    <>
      {customer && (
        <div className={styles.container}>
          <div>
            <div className={styles.titleContainer}>
              <h2>Default addresses</h2>
            </div>
            <div className={styles.sectionsContainer}>
              <AddressDisplayer
                address={defaultBillingAddress}
                name="billing address"
              />
              <AddressDisplayer
                address={defaultShippingAddress}
                name="shipping address"
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
                  <th>Country</th>
                  <th>State</th>
                  <th>City</th>
                  <th>Postal Code</th>
                </tr>
              </thead>
              <tbody>
                {customer.addresses.map((address) => (
                  <tr key={address.id}>
                    <td>{address.first_name}</td>
                    <td>{address.last_name}</td>
                    <td>{address.address}</td>
                    <td>{address.country}</td>
                    <td>{address.state}</td>
                    <td>{address.city}</td>
                    <td>{address.postal_code}</td>
                    <td className={styles.actions}>
                      <ActionBtn
                        action="delete"
                        onClick={() => {
                          deleteAddress({ addressId: address.id || -1 });
                        }}
                      />
                      <ActionBtn action="modify" onClick={() => {}} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.btnContainer}>
              <Button>Add Address</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddressBook;
