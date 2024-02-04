import { useRef } from "react";
import Button from "../Button/Button";
import styles from "./styles.module.css";

interface Props {
  onSignup(email: string, username: string, password: string): void;
}

const SignupForm = ({ onSignup }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.section}>
      <h5 className={styles.sectionTitle}>Create An Account</h5>
      <form
        ref={formRef}
        onSubmit={(event) => {
          event.preventDefault();
          console.log("login");
        }}
        className={styles.form}
      >
        <span>Personal Inforamtion</span>
        <div className={styles.inputSection}>
          <span className={styles.required}>Email </span>
          <input
            ref={emailRef}
            type="email"
            placeholder="Enter Your Email"
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputSection}>
          <span className={styles.required}>User Name</span>
          <input
            ref={userNameRef}
            type="text"
            placeholder="Enter User Name"
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputSection}>
          <span className={styles.required}>Password </span>
          <input
            ref={passwordRef}
            type="password"
            placeholder="Enter Password"
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputSection}>
          <span className={styles.required}>Confirm Password </span>
          <input
            ref={confirmPasswordRef}
            type="password"
            placeholder="Confirm Password"
            required
            className={styles.input}
          />
        </div>
        <div className={styles.btnContainer}>
          <Button
            filled
            onClick={() => {
              if (
                emailRef.current &&
                userNameRef.current &&
                passwordRef.current &&
                confirmPasswordRef.current
              ) {
                if (formRef.current?.checkValidity()) {
                  if (
                    passwordRef.current.value !==
                    confirmPasswordRef.current.value
                  ) {
                    window.alert("check pass");
                  } else {
                    onSignup(
                      emailRef.current.value,
                      userNameRef.current.value,
                      passwordRef.current.value
                    );
                  }
                }
              }
            }}
          >
            Signup
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
