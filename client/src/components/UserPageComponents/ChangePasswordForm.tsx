import { useRef } from "react";
import styles from "./styles.module.css";
import useCustomer from "../../hooks/useCustomer";

const ChangePasswordForm = () => {
  const {
    changePassword,
    isChangingPasswordSuccess,
    isChangingPasswordPending,
    isChangingPasswordError,
  } = useCustomer();

  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  if (isChangingPasswordSuccess) console.log("pass changed");
  if (isChangingPasswordError) console.error("error while changing password");

  const handleChangePassword = () => {
    if (oldPasswordRef.current && newPasswordRef.current)
      changePassword({
        currentPassword: oldPasswordRef.current.value,
        newPassword: newPasswordRef.current.value,
      });
  };

  return (
    <>
      <h4>Change Password</h4>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleChangePassword();
        }}
      >
        <div className={styles.inputGroups}>
          <div className={styles.inputGroup}>
            <span className={styles.required}>Current Password</span>
            <input
              ref={oldPasswordRef}
              type="password"
              required
              autoComplete="current-password"
            />
          </div>
          <div className={styles.inputGroup}>
            <span className={styles.required}>New Password</span>
            <input
              ref={newPasswordRef}
              type="password"
              required
              autoComplete="new-password"
            />
          </div>
          <div className={styles.inputGroup}>
            <span className={styles.required}>Confirm Password</span>
            <input
              ref={confirmPasswordRef}
              type="password"
              required
              autoComplete="new-password"
            />
          </div>
        </div>
        {isChangingPasswordPending && <span>changing pass...</span>}
        <div className={styles.btnContainer}>
          <button className={styles.link}>Change Password</button>
        </div>
      </form>
    </>
  );
};

export default ChangePasswordForm;
