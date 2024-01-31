import useCustomer from "../../hooks/useCustomer";
import AddressDisplayer from "./AddressDisplayer";
import styles from "./styles.module.css";

interface Props {
  displayAddressBook(): void;
}

const AccountDashboard = ({ displayAddressBook }: Props) => {
  const { customer } = useCustomer();
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
              <h2>Account Information</h2>
            </div>
            <div className={styles.sectionsContainer}>
              <div className={styles.sectionContainer}>
                <h4>Contact Information</h4>
                <span>{`${customer.user.first_name} ${customer.user.last_name}`}</span>
                <span>{customer.user.email}</span>
                <div className={styles.flxBx}>
                  <span className={styles.link}>Edit</span>
                  <span className={styles.link}>Change Password</span>
                </div>
              </div>
              <div className={styles.sectionContainer}>
                <h4>Newsletters</h4>
                <span>You are not subscribed to our newsletter</span>
                <span className={styles.link}>Edit</span>
              </div>
            </div>
          </div>
          <div>
            <div className={`${styles.titleContainer} ${styles.flxBx}`}>
              <h2>Address Book</h2>
              <div onClick={displayAddressBook}>
                <span className={styles.link}>Manage Addresses</span>
              </div>
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
        </div>
      )}
    </>
  );
};

export default AccountDashboard;
