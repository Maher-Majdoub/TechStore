import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import styles from "./styles.module.css";
import { endpoints } from "../../constants";

const NewCustomer = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.section}>
      <h5 className={styles.sectionTitle}>New Customer?</h5>
      <span className={styles.desc}>
        Creating an account has many benefits:
      </span>
      <ul className={styles.ul}>
        <li>Check out faster</li>
        <li>Exclusive offers and discounts</li>
        <li>Save order history</li>
        <li>Track orders and more</li>
      </ul>
      <div className={styles.btnContainer}>
        <Button
          filled
          onClick={() => {
            navigate(endpoints["signup"]);
          }}
        >
          Create An Account
        </Button>
      </div>
    </div>
  );
};

export default NewCustomer;
