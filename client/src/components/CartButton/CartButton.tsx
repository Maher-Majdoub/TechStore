import { useState } from "react";
import Icon from "../Icon/Icon";
import { MdOutlineShoppingCart } from "react-icons/md";
import Minicart from "../Minicart/Minicart";
import styles from "./CartButton.module.css";

const CartButton = () => {
  const [hideCart, toggleHideCart] = useState(true);
  return (
    <div className={styles.container}>
      <Icon
        count={10}
        onClick={() => {
          toggleHideCart(!hideCart);
        }}
      >
        <MdOutlineShoppingCart />
      </Icon>
      <div
        className={
          styles.miniCart + " " + (hideCart ? styles.hiden : styles.shown)
        }
      >
        <Minicart />
      </div>
    </div>
  );
};

export default CartButton;
