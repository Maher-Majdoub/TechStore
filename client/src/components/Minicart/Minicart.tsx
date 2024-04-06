import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import Button from "../Button/Button";
import MiniProductCard from "../MiniProductCard/MiniProductCard";
import styles from "./Minicart.module.css";
import { endpoints } from "../../constants";

const Minicart = ({
  toggleShowCart,
}: {
  toggleShowCart(val: boolean): void;
}) => {
  const { cart, isError, deleteFromCart } = useCart();
  const navigate = useNavigate();

  if (isError) {
    return <h1>Something Went Wrong</h1>;
  }

  return (
    <>
      <div className={styles.cart}>
        <h3 className={styles.title}>My Cart</h3>
        <span className={styles.subTitle}>
          {cart?.itemsCount || 0} items in cart
        </span>
        {cart?.items && cart.items.length > 0 && (
          <>
            <div className={styles.container}>
              <Button
                onClick={() => {
                  toggleShowCart(false);
                  navigate(endpoints["cart"]);
                }}
              >
                View or Edit Your Cart
              </Button>
            </div>
            <ul className={styles.productsList}>
              {cart?.items?.map((item) => (
                <li key={item.product.id} className={styles.product}>
                  <MiniProductCard
                    product={item.product}
                    count={item.quantity}
                    onDelete={() => {
                      deleteFromCart({ itemId: item.id });
                    }}
                    onModify={() => {
                      toggleShowCart(false);
                      navigate(endpoints["cart"]);
                    }}
                  />
                </li>
              ))}
            </ul>
            <div className={styles.subTotal}>
              <span>Subtotal: </span>
              <span>${cart.total.toFixed(2) || 0}</span>
            </div>
            <div className={styles.container}>
              <Button
                onClick={() => {
                  toggleShowCart(false);
                  navigate(endpoints["checkout"]);
                }}
              >
                Go To Checkout
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Minicart;
