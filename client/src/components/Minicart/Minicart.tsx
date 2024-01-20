import useProducts from "../../hooks/useProducts";
import Button from "../Button/Button";
import MiniProductCard from "../MiniProductCart/MiniProductCard";
import styles from "./Minicart.module.css";

const total = 1234.99;

const Minicart = () => {
  const { data } = useProducts({ config: { params: { page: 1 } } });

  const products = data?.results.slice(0, 3);

  return (
    <div className={styles.cart}>
      <h3 className={styles.title}>My Cart</h3>
      <span className={styles.subTitle}>{products?.length} items in cart</span>
      <div className={styles.container}>
        <Button>View or Edit Your Cart</Button>
      </div>
      <ul className={styles.productsList}>
        {products?.map((prod) => (
          <li key={prod.id} className={styles.product}>
            <MiniProductCard
              product={prod}
              count={5}
              onDelete={() => {}}
              onModify={() => {}}
            />
          </li>
        ))}
      </ul>
      <div className={styles.subTotal}>
        <span>Subtotal: </span>
        <span>${total}</span>
      </div>
      <div className={styles.container}>
        <Button>Go To Checkout</Button>
      </div>
    </div>
  );
};

export default Minicart;
