import { useState } from "react";
import Navigator from "../../components/Navigator/Navigator";
import Process from "../../components/Process/Process";
import useCustomer, { Address } from "../../hooks/useCustomer";
import styles from "./CheckoutPage.module.css";
import { MdOutlineDone } from "react-icons/md";
import Button from "../../components/Button/Button";
import LinksSection from "../../components/LinksSection/LinksSection";
import OrderSummary from "../../components/OrderSummary/OrderSummary";

const CheckoutPage = () => {
  const { customer } = useCustomer();
  const defaultShippingAddress = customer?.addresses.find(
    (address) => address.is_default_shipping_address
  );
  const [selectedAddress, setSeletedAddress] = useState<Address>(
    defaultShippingAddress as Address
  );

  const [shippingMethod, setShippingMethod] = useState<
    "standard" | "pickupFromStore"
  >("standard");

  return (
    <main className={styles.container + " container"}>
      <div className={styles.navContainer}>
        <Navigator />
      </div>
      <div className={styles.head}>
        <h2 className={styles.title}>Checkout</h2>
        <div className={styles.processes}>
          <Process name="Shipping" done />
          <Process name="Review & Payments" count={2} />
        </div>
      </div>
      <div className={styles.content}>
        <div>
          <div>
            <div>
              <div className={styles.titleContainer}>
                <h2>Shipping Address</h2>
              </div>
              <div className={styles.addresses}>
                {customer?.addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`${styles.address} ${
                      selectedAddress.id === address.id && styles.selected
                    }`}
                    onClick={() => {
                      setSeletedAddress(address);
                    }}
                  >
                    {selectedAddress.id === address.id && (
                      <div className={styles.selectedIcon}>
                        <MdOutlineDone />
                      </div>
                    )}
                    <span>
                      {address.first_name} {address.last_name}
                    </span>
                    <span>{address.address}</span>
                    <span>
                      {address.state} {address.city} {address.region}
                    </span>
                    <span>{address.country}</span>
                    <span>{address.phone_number}</span>
                  </div>
                ))}
              </div>
              <div className={styles.btnContainer}>
                <Button>Add Address</Button>
              </div>
            </div>
            <div>
              <div className={styles.titleContainer}>
                <h2>Shipping Method</h2>
              </div>
              <div className={styles.shippingMethodContainer}>
                <label htmlFor="standardShippingRadio" className={styles.label}>
                  <h6>Standard Rate</h6>
                  <div>
                    <input
                      type="radio"
                      name="shipping"
                      id="standardShippingRadio"
                      value="standard"
                      checked={shippingMethod === "standard"}
                      onChange={(event) => {
                        event.target.checked && setShippingMethod("standard");
                      }}
                    />
                    <div>
                      <span>
                        Price may vary depending on the item/destination. Shop
                        Staff will contact you.
                      </span>
                      <span>$21.00</span>
                    </div>
                  </div>
                </label>
                <label
                  htmlFor="pikupFromStoreShippingRadio"
                  className={styles.label}
                >
                  <h6>Pickup from store</h6>
                  <div>
                    <input
                      type="radio"
                      name="shipping"
                      id="pikupFromStoreShippingRadio"
                      value="pickupFromStore"
                      checked={shippingMethod === "pickupFromStore"}
                      onChange={(event) => {
                        event.target.checked &&
                          setShippingMethod("pickupFromStore");
                      }}
                    />
                    <div>
                      <span>1234 Street Adress City Address, 1234</span>
                      <span>$0.00</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>
            <div className={styles.btnContainer}>
              <Button filled>Next</Button>
            </div>
          </div>
        </div>
        <div className={styles.orderSummary}>
          <OrderSummary />
        </div>
      </div>
      <LinksSection />
    </main>
  );
};

export default CheckoutPage;
