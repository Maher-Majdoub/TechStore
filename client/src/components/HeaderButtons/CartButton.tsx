import { useRef, useState } from "react";
import Icon from "../Icon/Icon";
import { MdOutlineShoppingCart } from "react-icons/md";
import Minicart from "../Minicart/Minicart";
import hideOnClickOutSide from "../../services/hideOnClickOutside";
import useCart from "../../hooks/useCart";
import styles from "./styles.module.css";

const CartButton = () => {
  const [showCart, toggleShowCart] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  hideOnClickOutSide({
    ref: cartRef,
    toggleShow: toggleShowCart,
  });

  const { cart } = useCart();

  return (
    <div ref={cartRef} className={styles.container}>
      <Icon
        count={cart?.items?.length || 0}
        onClick={() => {
          toggleShowCart(!showCart);
        }}
      >
        <MdOutlineShoppingCart />
      </Icon>
      <div className={`${styles.popup} ${!showCart && styles.hiden}`}>
        <Minicart toggleShowCart={toggleShowCart} />
      </div>
    </div>
  );
};

export default CartButton;
