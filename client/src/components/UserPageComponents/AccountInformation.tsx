import useCustomer from "../../hooks/useCustomer";
import styles from "./styles.module.css";
import ChangeUserNameForm from "./ChangeUserNameForm";
import ChangePasswordFrom from "./ChangePasswordForm";
import ChangePersonalInfosForm from "./ChangePersonalInfosForm";

const AccountInformation = () => {
  const { customer } = useCustomer();
  const membershipVals: { [shortcut: string]: string } = {
    G: "Gold",
    S: "Silver",
    B: "Bronze",
  };

  return (
    <>
      {customer && (
        <div className={styles.container}>
          <div>
            <div className={styles.titleContainer}>
              <h2>Personal Inforamtion</h2>
            </div>
            <div className={styles.infos}>
              <div className={styles.info}>
                <span>First Name: </span>
                <span>{customer.first_name}</span>
              </div>
              <div className={styles.info}>
                <span>Last Name: </span>
                <span>{customer.last_name}</span>
              </div>
              <div className={styles.info}>
                <span>Email: </span>
                <span>{customer.email}</span>
              </div>
              <div className={styles.info}>
                <span>Phone: </span>
                <span>{customer.phone}</span>
              </div>
              <div className={styles.info}>
                <span>Birth Date: </span>
                <span>{customer.birth_date}</span>
              </div>
              <div className={styles.info}>
                <span>Membership:</span>
                <span>{membershipVals[customer.membership]}</span>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.titleContainer}>
              <h2>Edit Information</h2>
            </div>
            <div className={styles.sectionsContainer}>
              <div className={styles.sectionContainer}>
                <ChangeUserNameForm />
              </div>
              <div className={styles.sectionContainer}>
                <ChangePasswordFrom />
              </div>
              <div className={styles.sectionContainer}>
                <ChangePersonalInfosForm />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountInformation;
