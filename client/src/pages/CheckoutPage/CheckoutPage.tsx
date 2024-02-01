import styles from "./CheckoutPage.module.css";
import LinksSection from "../../components/LinksSection/LinksSection";
import SelectShippingMethod from "../../components/CheckoutPageComponents/SelectShippingMethod";
import Navigator from "../../components/Navigator/Navigator";
import Process from "../../components/Process/Process";
import SelectPaymentMethod from "../../components/CheckoutPageComponents/SelectPaymentMethod";
import { useNavigate } from "react-router-dom";

interface Props {
  selectedSection: "selectShippingMethod" | "selectPaymentMethod";
}

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
          onSubmit={(selectedAddress, shippingMethod) => {
            console.log(selectedAddress, shippingMethod);
            navigate("/cart/checkout/payment");
          }}
        />
      )}
      {selectedSection === "selectPaymentMethod" && <SelectPaymentMethod />}
      <LinksSection />
    </main>
  );
};

export default CheckoutPage;
