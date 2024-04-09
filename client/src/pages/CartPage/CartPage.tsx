import { useNavigate } from "react-router-dom";
import CartItemsList from "../../components/CartItemsList/CartItemsList";
import useCart from "../../hooks/useCart";
import styles from "./CartPage.module.css";
import CartSummary from "../../components/CartSummary/CartSummary";
import Navigator from "../../components/Navigator/Navigator";
import LinksSection from "../../components/LinksSection/LinksSection";
import ServerError from "../../components/Error/ServerError";
import { CircularProgress } from "@mui/material";
import { endpoints } from "../../constants";
import { useEffect } from "react";
import { toast } from "react-toastify";

const CartPage = () => {
  const { cart, isError, isLoading, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cart || cart.itemsCount <= 0) {
      toast.warn("Please add items in your cart");
      navigate(endpoints["home"]);
    }
  }, []);

  return (
    <main>
      <div className={styles.container + " container"}>
        {cart && (
          <>
            <Navigator />
            <h2 className={styles.title}>Shopping Cart</h2>
            {isError ? (
              <ServerError />
            ) : isLoading ? (
              <CircularProgress />
            ) : (
              <>
                <div className={styles.content}>
                  <div className={styles.cartData}>
                    <div className={styles.cartItems}>
                      <CartItemsList />
                    </div>
                    <div className={styles.actions}>
                      <div>
                        <button
                          className={styles.btn + " " + styles.light}
                          onClick={() => {
                            navigate(endpoints["home"]);
                          }}
                        >
                          Continue Shopping
                        </button>
                        <button className={styles.btn} onClick={clearCart}>
                          Clear Shopping Cart
                        </button>
                      </div>
                      <button className={styles.btn}>
                        Update Shopping Cart
                      </button>
                    </div>
                  </div>
                  <div className={styles.cartSummaryContainer}>
                    <CartSummary />
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
      <LinksSection />
    </main>
  );
};

export default CartPage;
