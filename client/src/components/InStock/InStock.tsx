import { MdCheckCircle } from "react-icons/md";
import styles from "./InStock.module.css";

const InStock = () => {
  return (
    <div className={styles.container}>
      <MdCheckCircle />
      <span>in stock</span>
    </div>
  );
};

export default InStock;
