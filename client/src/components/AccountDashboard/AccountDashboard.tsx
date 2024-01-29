import useCustomer from "../../hooks/useCustomer";
import styles from "./AccountDashboard.module.css";

const AccountDashboard = () => {
  const { customer } = useCustomer();
  const defaultShippingAdress = customer?.adresses.find(
    (adress) => adress.is_default
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
              <span className={styles.link}>Manage Addresses</span>
            </div>
            <div className={styles.sectionsContainer}>
              <div className={styles.sectionContainer}>
                <h4>Default Billing Address</h4>
                <span>You have not set a default billing address.</span>
                <span className={styles.link}>Edit Address</span>
              </div>
              <div className={styles.sectionContainer}>
                <h4>Default Shipping Address</h4>
                {defaultShippingAdress ? (
                  <span>{defaultShippingAdress.description}</span>
                ) : (
                  <span>You have not set a default shipping address.</span>
                )}
                <span className={styles.link}>Edit Address</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountDashboard;
