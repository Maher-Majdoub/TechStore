import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import Button from "../Button/Button";
import MiniProductCard from "../MiniProductCard/MiniProductCard";
import styles from "./Minicart.module.css";

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

  var total = 0;
  if (cart?.items)
    for (const item of cart.items) {
      total += item.product.unit_price * item.quantity;
    }

  return (
    <>
      <div className={styles.cart}>
        <h3 className={styles.title}>My Cart</h3>
        <span className={styles.subTitle}>
          {cart?.items.length} items in cart
        </span>
        <div className={styles.container}>
          <Button
            onClick={() => {
              toggleShowCart(false);
              navigate("/cart");
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
                  navigate("/cart");
                }}
              />
            </li>
          ))}
        </ul>
        <div className={styles.subTotal}>
          <span>Subtotal: </span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className={styles.container}>
          <Button
            onClick={() => {
              toggleShowCart(false);
              navigate("/cart/checkout");
            }}
          >
            Go To Checkout
          </Button>
        </div>
      </div>
    </>
  );
};

export default Minicart;
