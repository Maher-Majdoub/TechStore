import { Product } from "../../hooks/useProducts";
import styles from "./Minicart.module.css";

const products: Product[] = [];
const total = 1234.99;

const Minicart = () => {
  return (
    <div className={styles.cart}>
      <h3 className={styles.title}>My Cart</h3>
      <span className={styles.subTitle}>{products.length} item in cart</span>
      <button className={styles.addBtn}>View or Edit Your Cart</button>
      <ul className={styles.productsList}>
        {products.map((prod) => (
          <li>{prod.name}</li>
        ))}
      </ul>
      <div className={styles.subtotal}>
        <span>Subtotal: </span>
        <span>${total}</span>
      </div>
      <button className={styles.chekoutBtn}>Go To Checkout</button>
    </div>
  );
};

export default Minicart;
