import { useNavigate } from "react-router-dom";
import CartItemsList from "../../components/CartItemsList/CartItemsList";
import useCart from "../../hooks/useCart";
import styles from "./CartPage.module.css";
import CartSummary from "../../components/CartSummary/CartSummary";
import Navigator from "../../components/Navigator/Navigator";

const CartPage = () => {
  const { cart, isLoading, isError } = useCart();
  const navigate = useNavigate();

  if (isError) {
    return <h1>Something Went Wrong!</h1>;
  }

  return (
    <main className={styles.container + " container"}>
      {isLoading && <p>isLoading...</p>}
      {cart && (
        <>
          <Navigator />
          <h2 className={styles.title}>Shopping Cart</h2>
          <div className={styles.flxBx}>
            <div className={styles.cartData}>
              <div className={styles.cartItems}>
                <CartItemsList />
              </div>
              <div className={styles.actions}>
                <div>
                  <button
                    className={styles.btn + " " + styles.light}
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Continue Shopping
                  </button>
                  <button className={styles.btn}>Clear Shopping Cart</button>
                </div>
                <button className={styles.btn}>Update Shopping Cart</button>
              </div>
            </div>
            <CartSummary />
          </div>
        </>
      )}
    </main>
  );
};

export default CartPage;