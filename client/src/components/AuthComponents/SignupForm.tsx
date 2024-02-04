import Button from "../Button/Button";
import styles from "./styles.module.css";

const SignupForm = () => {
  return (
    <div className={styles.section}>
      <h5 className={styles.sectionTitle}>Create An Account</h5>
      <form
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
            type="email"
            placeholder="Enter Your Email"
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputSection}>
          <span className={styles.required}>User Name</span>
          <input
            type="text"
            placeholder="Enter User Name"
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputSection}>
          <span className={styles.required}>Password </span>
          <input
            type="password"
            placeholder="Enter Password"
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputSection}>
          <span className={styles.required}>Confirm Password </span>
          <input
            type="password"
            placeholder="Confirm Password"
            required
            className={styles.input}
          />
        </div>
        <div className={styles.btnContainer}>
          <Button filled>Signup</Button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
