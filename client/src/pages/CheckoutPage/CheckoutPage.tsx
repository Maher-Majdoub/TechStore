import LinksSection from "../../components/LinksSection/LinksSection";
import SelectShippingMethod from "../../components/CheckoutPageComponents/SelectShippingMethod";
import Navigator from "../../components/Navigator/Navigator";
import Process from "../../components/Process/Process";
import SelectPaymentMethod from "../../components/CheckoutPageComponents/SelectPaymentMethod";
import useLocation from "../../hooks/useLocation";
import { useNavigate } from "react-router-dom";
import useCustomer, { Address } from "../../hooks/useCustomer";
import { endpoints } from "../../constants";
import { ShippingMethod } from "../../hooks/useOrder";
import styles from "./CheckoutPage.module.css";
import { useEffect } from "react";
import { toast } from "react-toastify";

let selectedShippingAddress = {} as Address;
let shippingMethod = "" as ShippingMethod;

const CheckoutPage = () => {
  const { pathname } = useLocation();
  const currEndpoints = pathname.split("/");
  const endpoint = currEndpoints[currEndpoints.length - 1];

  const { customer } = useCustomer();
  const navigate = useNavigate();

  useEffect(() => {
    if (!customer) {
      toast.warn("Please login to place your order");
      navigate(endpoints["login"]);
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
