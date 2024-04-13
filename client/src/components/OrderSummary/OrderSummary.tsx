import useCart from "../../hooks/useCart";
import styles from "./OrderSummary.module.css";
import noProductImage from "../../assets/noProductImage.png";

const OrderSummary = () => {
  const { cart } = useCart();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Order Summary</h2>
      <span>{cart?.items.length} items in Cart</span>
      <ul className={styles.ul}>
        {cart?.items.map((item) => (
          <li key={item.id} className={styles.product}>
            <img
              src={
                item.product.images.length > 0
                  ? item.product.images[0].image
                  : noProductImage
              }
              className={styles.img}
            />
            <div>
              <span>{item.product.description.slice(0, 50)}....</span>
              <div className={styles.flxBx}>
                <span>Qty: {item.quantity}</span>
                <span>
                  ${item.product.unit_price * (1 - item.product.discount)}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.flxBx}>
        <span>total:</span>
        <span className={styles.total}>${cart?.total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
