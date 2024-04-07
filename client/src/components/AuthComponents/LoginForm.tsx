import { useRef } from "react";
import Button from "../Button/Button";
import styles from "./styles.module.css";

interface Props {
  onLogin(usename: string, password: string): void;
  isLoading?: boolean;
}

const LoginForm = ({ onLogin, isLoading = false }: Props) => {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.section}>
      <h5 className={styles.sectionTitle}>Registered Customers</h5>
      <span className={styles.desc}>
        If you have an account, sign in with your credentials.
      </span>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
        className={styles.form}
      >
        <div className={styles.inputSection}>
          <span className={styles.required}>User Name</span>
          <input
            ref={username}
            type="text"
            placeholder="Your User Name"
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputSection}>
          <span className={styles.required}>Password</span>
          <input
            ref={password}
            type="password"
            placeholder="Your Password"
            required
            className={styles.input}
          />
        </div>
        <div className={styles.btnContainer}>
          <Button
            load={isLoading}
            onClick={() => {
              if (username.current?.value && password.current?.value) {
                onLogin(username.current.value, password.current.value);
              }
            }}
            filled
          >
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
