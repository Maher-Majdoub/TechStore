import useCustomer from "../../hooks/useCustomer";
import styles from "./styles.module.css";
import ChangeUserNameForm from "./ChangeUserNameForm";
import ChangePasswordFrom from "./ChangePasswordForm";

const AccountInformation = () => {
  const {
    customer,
    isChangingPasswordSuccess,
    isChangingPasswordError,
    isChangingUsernameSuccess,
    isChangingUsernameError,
  } = useCustomer();
  const membershipVals: { [shortcut: string]: string } = {
    G: "Gold",
    S: "Silver",
    B: "Bronze",
  };

  const handleChangePersonalInfos = () => {};

  if (isChangingPasswordSuccess) console.log("pass changed");
  if (isChangingPasswordError) console.error("error while changing password");

  if (isChangingUsernameSuccess) console.log("username changed");
  if (isChangingUsernameError) console.error("error while changing username");

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
                <h4>Change Personal Infos</h4>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleChangePersonalInfos();
                  }}
                >
                  <div className={styles.inputGroups}>
                    <div className={styles.inputGroup}>
                      <span>First Name</span>
                      <input type="text" defaultValue={customer.first_name} />
                    </div>
                    <div className={styles.inputGroup}>
                      <span>Last Name</span>
                      <input type="text" defaultValue={customer.last_name} />
                    </div>
                    <div className={styles.inputGroup}>
                      <span>Email</span>
                      <input type="text" defaultValue={customer.email} />
                    </div>
                    <div className={styles.inputGroup}>
                      <span>Phone</span>
                      <input type="text" defaultValue={customer.phone} />
                    </div>
                    <div className={styles.inputGroup}>
                      <span>Birth Date</span>
                      <input type="date" defaultValue={customer.birth_date} />
                    </div>
                  </div>
                  <div className={styles.btnContainer}>
                    <button className={styles.link}>
                      Change Personal Infos
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountInformation;
