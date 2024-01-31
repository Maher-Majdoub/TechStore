import { useRef } from "react";
import useCustomer from "../../hooks/useCustomer";
import styles from "./styles.module.css";

const AccountInformation = () => {
  const { customer } = useCustomer();
  const membershipVals: { [shortcut: string]: string } = {
    G: "Gold",
    S: "Silver",
    B: "Bronze",
  };

  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const newUserNameRef = useRef<HTMLInputElement>(null);

  const handleChangeUserName = () => {};
  const handleChangePassword = () => {};
  const handleChangePersonalInfos = () => {};

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
                <span>User Name: </span>
                <span>{customer.user.username}</span>
              </div>
              <div className={styles.info}>
                <span>First Name: </span>
                <span>{customer.user.first_name}</span>
              </div>
              <div className={styles.info}>
                <span>Last Name: </span>
                <span>{customer.user.last_name}</span>
              </div>
              <div className={styles.info}>
                <span>Email: </span>
                <span>{customer.user.email}</span>
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
                <h4>Change Username</h4>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleChangeUserName();
                  }}
                >
                  <div className={styles.inputGroups}>
                    <div className={styles.inputGroup}>
                      <span className={styles.required}>New Username</span>
                      <input ref={newUserNameRef} type="text" required />
                    </div>
                    <div className={styles.inputGroup}>
                      <span className={styles.required}>Confirm Username</span>
                      <input ref={newUserNameRef} type="text" required />
                    </div>
                    <div className={styles.btnContainer}>
                      <button className={styles.link}>Change Username</button>
                    </div>
                  </div>
                </form>
              </div>
              <div className={styles.sectionContainer}>
                <h4>Change Password</h4>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleChangePassword();
                  }}
                >
                  <div className={styles.inputGroups}>
                    <div className={styles.inputGroup}>
                      <span className={styles.required}>Old Password</span>
                      <input ref={oldPasswordRef} type="text" required />
                    </div>
                    <div className={styles.inputGroup}>
                      <span className={styles.required}>New Password</span>
                      <input ref={newPasswordRef} type="text" required />
                    </div>
                    <div className={styles.inputGroup}>
                      <span className={styles.required}>Confirm Password</span>
                      <input ref={confirmPasswordRef} type="text" required />
                    </div>
                  </div>
                  <div className={styles.btnContainer}>
                    <button className={styles.link}>Change Password</button>
                  </div>
                </form>
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
                      <input
                        type="text"
                        defaultValue={customer.user.first_name}
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <span>Last Name</span>
                      <input
                        type="text"
                        defaultValue={customer.user.last_name}
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <span>Email</span>
                      <input type="text" defaultValue={customer.user.email} />
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
