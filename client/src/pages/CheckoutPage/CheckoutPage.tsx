import styles from "./CheckoutPage.module.css";
import LinksSection from "../../components/LinksSection/LinksSection";
import SelectShippingMethod from "../../components/CheckoutPageComponents/SelectShippingMethod";
import Navigator from "../../components/Navigator/Navigator";
import Process from "../../components/Process/Process";
import SelectPaymentMethod from "../../components/CheckoutPageComponents/SelectPaymentMethod";
import { useNavigate } from "react-router-dom";
import { Address } from "../../hooks/useCustomer";

interface Props {
  selectedSection: "selectShippingMethod" | "selectPaymentMethod";
}

let selectedShippingAddress = {} as Address;
let shippingMethod = "";

const CheckoutPage = ({ selectedSection }: Props) => {
  const navigate = useNavigate();
  return (
    <main className={styles.container + " container"}>
      <div className={styles.navContainer}>
        <Navigator />
      </div>
      <div className={styles.head}>
        <h2 className={styles.title}>Checkout</h2>
        <div className={styles.processes}>
          <Process name="Shipping" done />
          <Process
            name="Review & Payments"
            done={selectedSection === "selectPaymentMethod"}
            count={2}
          />
        </div>
      </div>
      {selectedSection === "selectShippingMethod" && (
        <SelectShippingMethod
          onSubmit={(selectedShippingAdd, shippingMeth) => {
            console.log(selectedShippingAdd, shippingMeth);
            selectedShippingAddress = selectedShippingAdd;
            shippingMethod = shippingMeth;
            navigate("/cart/checkout/payment");
          }}
        />
      )}
      {selectedSection === "selectPaymentMethod" && (
        <SelectPaymentMethod
          selectedShippingAddress={selectedShippingAddress}
          shippingMethod={shippingMethod}
        />
      )}
      <LinksSection />
    </main>
  );
};

export default CheckoutPage;
