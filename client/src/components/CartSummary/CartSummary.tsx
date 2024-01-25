import { useState } from "react";
import useCart from "../../hooks/useCart";
import Button from "../Button/Button";
import styles from "./CartSummary.module.css";

const CartSummary = () => {
  const { cart } = useCart();
  const [shippingMethod, setShippingMethod] = useState<
    "standard" | "pickupFromStore"
  >("standard");

  var total = 0;
  if (cart?.items)
    for (const item of cart.items)
      total += item.quantity * item.product.unit_price;
  return (
    <div className={styles.summary}>
      <h4 className={styles.title}>Summary</h4>
      <div className={styles.section}>
        <h5 className={styles.sectionTitle}>Shipping</h5>
        <div className={styles.sectionContent}>
          <label htmlFor="standardShippingRadio" className={styles.label}>
            <h6>Standard Rate</h6>
            <div>
              <input
                type="radio"
                name="shipping"
                id="standardShippingRadio"
                value="standard"
                checked={shippingMethod === "standard"}
                onChange={(event) => {
                  event.target.checked && setShippingMethod("standard");
                }}
              />
              <div>
                <span>
                  Price may vary depending on the item/destination. Shop Staff
                  will contact you.
                </span>
                <span>$21.00</span>
              </div>
            </div>
          </label>
          <label htmlFor="pikupFromStoreShippingRadio" className={styles.label}>
            <h6>Pickup from store</h6>
            <div>
              <input
                type="radio"
                name="shipping"
                id="pikupFromStoreShippingRadio"
                value="pickupFromStore"
                checked={shippingMethod === "pickupFromStore"}
                onChange={(event) => {
                  event.target.checked && setShippingMethod("pickupFromStore");
                }}
              />
              <div>
                <span>1234 Street Adress City Address, 1234</span>
                <span>$0.00</span>
              </div>
            </div>
          </label>
        </div>
      </div>
      <div className={styles.section}>
        <h5 className={styles.sectionTitle}>Apply Discount Code</h5>
        <div className={styles.sectionContent}>
          <div className={styles.inputSection}>
            <span>Enter discount code</span>
            <input type="text" placeholder="Enter discount code" />
          </div>
          <Button>Apply Discount</Button>
        </div>
      </div>
      <div className={styles.infos}>
        <div>
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div>
          <span>Shipping</span>
          <span>${shippingMethod === "standard" ? "21.00" : "0.00"}</span>
        </div>
        <div>
          <span>Tax</span>
          <span>$1.91</span>
        </div>
        <div>
          <span>Order Total</span>
          <span className={styles.total}>
            $
            {(total + 1.91 + (shippingMethod === "standard" ? 21 : 0)).toFixed(
              2
            )}
          </span>
        </div>
      </div>
      <Button filled>Proceed To Checkout</Button>
    </div>
  );
};

export default CartSummary;