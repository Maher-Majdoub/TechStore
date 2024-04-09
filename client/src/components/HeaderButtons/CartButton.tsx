import { useRef, useState } from "react";
import Icon from "../Icon/Icon";
import { MdOutlineShoppingCart } from "react-icons/md";
import Minicart from "../Minicart/Minicart";
import hideOnClickOutSide from "../../services/hideOnClickOutside";
import useCart from "../../hooks/useCart";
import styles from "./styles.module.css";
import { screenWidths } from "../../constants";
import { useWindowSize } from "@uidotdev/usehooks";
import { LiaTimesSolid } from "react-icons/lia";
import { Modal } from "@mui/material";

const CartButton = () => {
  const [showCart, toggleShowCart] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  hideOnClickOutSide({
    ref: cartRef,
    toggleShow: toggleShowCart,
  });

  const { cart } = useCart();
  const { width } = useWindowSize();

  return (
    <div ref={cartRef} className={styles.container}>
      <Icon
        count={cart?.itemsCount || 0}
        onClick={() => {
          toggleShowCart(!showCart);
        }}
      >
        <MdOutlineShoppingCart />
      </Icon>
      {showCart && (
        <>
          {width && width > screenWidths["tablets"] ? (
            <div className={styles.popup}>
              <div className={styles.desktopCart}>
                <Minicart toggleShowCart={toggleShowCart} />
              </div>
            </div>
          ) : (
            <Modal
              open={showCart}
              sx={{
                height: "100%",
                width: "80%",
                marginLeft: "auto",
              }}
            >
              <div className={styles.popupContainer}>
                <div className={styles.exitBtnContainer}>
                  <button
                    className={styles.exitBtn}
                    onClick={() => {
                      toggleShowCart(false);
                    }}
                  >
                    <LiaTimesSolid />
                  </button>
                </div>
                <div className={styles.miniCart}>
                  <Minicart toggleShowCart={toggleShowCart} />
                </div>
              </div>
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default CartButton;
