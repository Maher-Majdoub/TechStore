import { FaSquarePhone } from "react-icons/fa6";
import styles from "./CheckAvailability.module.css";

const CheckAvailability = () => {
  return (
    <div className={styles.container}>
      <FaSquarePhone />
      <span>check availability</span>
    </div>
  );
};

export default CheckAvailability;
