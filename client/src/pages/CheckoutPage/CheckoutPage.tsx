import styles from "./CheckoutPage.module.css";
import LinksSection from "../../components/LinksSection/LinksSection";
import SelectShippingMethod from "../../components/CheckoutPageComponents/SelectShippingMethod";
import Navigator from "../../components/Navigator/Navigator";
import Process from "../../components/Process/Process";
import SelectPaymentMethod from "../../components/CheckoutPageComponents/SelectPaymentMethod";
import { useNavigate } from "react-router-dom";
import { Address } from "../../hooks/useCustomer";
import useLocation from "../../hooks/useLocation";
import { ShippingMethod } from "../../hooks/useOrder";
import { endpoints } from "../../constants";

let selectedShippingAddress = {} as Address;
let shippingMethod = "" as ShippingMethod;

const CheckoutPage = () => {
  const { pathname } = useLocation();
  const currEndpoints = pathname.split("/");
  const endpoint = currEndpoints[currEndpoints.length - 1];

  console.log(endpoint);

  const navigate = useNavigate();

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
              console.log(selectedShippingAdd, shippingMeth);
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
