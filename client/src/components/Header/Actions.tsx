import AccountButton from "../HeaderButtons/AccountButton";
import CartButton from "../HeaderButtons/CartButton";
import WishesButton from "../HeaderButtons/WishesButton";
import styles from "./styles.module.css";
const Actions = () => {
  return (
    <div className={styles.actions}>
      <WishesButton />
      <CartButton />
      <AccountButton />
    </div>
  );
};

export default Actions;
