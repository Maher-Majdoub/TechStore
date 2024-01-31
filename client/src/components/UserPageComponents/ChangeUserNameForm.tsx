import { useRef } from "react";
import useCustomer from "../../hooks/useCustomer";
import styles from "./styles.module.css";

const ChangeUserNameForm = () => {
  const { changeUsername, isChangingUsernamePending } = useCustomer();

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

  return (
    <>
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
            <input ref={currentPasswordRef} type="password" required />
          </div>
          <div className={styles.inputGroup}>
            <span className={styles.required}>New Username</span>
            <input ref={newUserNameRef} type="text" required />
          </div>
          {isChangingUsernamePending && <span>changing username....</span>}
          <div className={styles.btnContainer}>
            <button className={styles.link}>Change Username</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ChangeUserNameForm;
