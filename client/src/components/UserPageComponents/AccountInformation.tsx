import { useRef } from "react";
import useCustomer from "../../hooks/useCustomer";
import styles from "./styles.module.css";

const AccountInformation = () => {
  const {
    customer,
    changePassword,
    isChangingPasswordSuccess,
    isChangingPasswordPending,
    isChangingPasswordError,
    changeUsername,
    isChangingUsernameSuccess,
    isChangingUsernamePending,
    isChangingUsernameError,
  } = useCustomer();
  const membershipVals: { [shortcut: string]: string } = {
    G: "Gold",
    S: "Silver",
    B: "Bronze",
  };

  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const currentPasswordRef = useRef<HTMLInputElement>(null);
  const newUserNameRef = useRef<HTMLInputElement>(null);

  const handleChangeUserName = () => {
    if (currentPasswordRef.current && newUserNameRef.current) {
      changeUsername({
        currentPassword: currentPasswordRef.current.value,
        newUsername: newUserNameRef.current.value,
      });
    }
  };
  const handleChangePassword = () => {
    if (oldPasswordRef.current && newPasswordRef.current)
      changePassword({
        currentPassword: oldPasswordRef.current.value,
        newPassword: newPasswordRef.current.value,
      });
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
                <span>User Name: </span>
                <span>{customer.user.username}</span>
              </div>
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
                <h4>Change Username</h4>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleChangeUserName();
                  }}
                >
                  <div className={styles.inputGroups}>
                    <div className={styles.inputGroup}>
                      <span className={styles.required}>Current Password</span>
                      <input
                        ref={currentPasswordRef}
                        type="password"
                        required
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <span className={styles.required}>New Username</span>
                      <input ref={newUserNameRef} type="text" required />
                    </div>
                    {isChangingUsernamePending && (
                      <span>changing username....</span>
                    )}
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
                      <input ref={oldPasswordRef} type="password" required />
                    </div>
                    <div className={styles.inputGroup}>
                      <span className={styles.required}>New Password</span>
                      <input ref={newPasswordRef} type="password" required />
                    </div>
                    <div className={styles.inputGroup}>
                      <span className={styles.required}>Confirm Password</span>
                      <input
                        ref={confirmPasswordRef}
                        type="password"
                        required
                      />
                    </div>
                  </div>
                  {isChangingPasswordPending && <span>changing pass...</span>}
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
