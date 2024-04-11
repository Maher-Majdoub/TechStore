import LinksSection from "../../components/LinksSection/LinksSection";
import SelectShippingMethod from "../../components/CheckoutPageComponents/SelectShippingMethod";
import Navigator from "../../components/Navigator/Navigator";
import Process from "../../components/Process/Process";
import SelectPaymentMethod from "../../components/CheckoutPageComponents/SelectPaymentMethod";
import useLocation from "../../hooks/useLocation";
import useAuthorization from "../../hooks/useAuthorization";
import { toast } from "react-toastify";
import { Address } from "../../hooks/useCustomer";
import { endpoints } from "../../constants";
import { useNavigate } from "react-router-dom";
import { ShippingMethod } from "../../hooks/useOrder";
import { NextPageContext } from "../../contexts";
import { useContext, useEffect } from "react";
import styles from "./CheckoutPage.module.css";
import useCart from "../../hooks/useCart";

let selectedShippingAddress = {} as Address;
let shippingMethod = "" as ShippingMethod;

const CheckoutPage = () => {
  const { pathname } = useLocation();
  const currEndpoints = pathname.split("/");
  const endpoint = currEndpoints[currEndpoints.length - 1];

  const { isAccessExpired } = useAuthorization();
  const navigate = useNavigate();
  const { resetNextPage, setNextPage } = useContext(NextPageContext);
  const { cart } = useCart();

  useEffect(() => {
    resetNextPage();
  }, []);

  useEffect(() => {
    if (isAccessExpired) {
      toast.warn("Please login to place your order");
      setNextPage(endpoints["checkout"]);
      navigate(endpoints["login"]);
    }
  }, []);

  useEffect(() => {
    if (!cart || cart.itemsCount == 0) {
      toast.warn("Please add items in your cart");
      navigate(endpoints["home"]);
    }
  }, []);

  return (
    <main>
      <div className={styles.container + " container"}>
        <div className={styles.navContainer}>
          <Navigator />
        </div>
        <div className={styles.head}>
          <h2 className={styles.title}>Checkout</h2>
          <div className={styles.processes}>
            <Process name="Shipping" done />
            <Process
              name="Review & Payments"
              done={endpoint === "payment"}
              count={2}
            />
          </div>
        </div>
        {endpoint === "checkout" && (
          <SelectShippingMethod
            onSubmit={(selectedShippingAdd, shippingMeth) => {
              selectedShippingAddress = selectedShippingAdd;
              shippingMethod = shippingMeth;
              navigate(endpoints["payment"]);
            }}
          />
        )}
        {endpoint === "payment" && (
          <SelectPaymentMethod
            selectedShippingAddress={selectedShippingAddress}
            shippingMethod={shippingMethod}
          />
        )}
      </div>
      <LinksSection />
    </main>
  );
};

export default CheckoutPage;
