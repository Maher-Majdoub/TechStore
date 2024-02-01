import { useState } from "react";
import useCustomer, { Address } from "../../hooks/useCustomer";
import styles from "./styles.module.css";
import { MdOutlineDone } from "react-icons/md";
import Button from "../Button/Button";
import AddEditAddress from "../UserPageComponents/AddEditAddress";
import OrderSummary from "../OrderSummary/OrderSummary";

const SelectPaymentMethod = () => {
  const { customer } = useCustomer();
  const defaultBillingAddress = customer?.addresses.find(
    (address) => address.is_default_billing_address
  );

  const [selectedBillingAddress, setSeletedBillingAddress] = useState<Address>(
    defaultBillingAddress as Address
  );

  const [showAddAddressForm, setShowAddAddressForm] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<
    "cashOnDelivery" | "creditCart"
  >("cashOnDelivery");

  return (
    <div>
      {showAddAddressForm && (
        <div
          className={styles.addAddressContainer}
          onClick={() => {
            setShowAddAddressForm(false);
          }}
        >
          <div
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <AddEditAddress
              afterSubmition={() => {
                setShowAddAddressForm(false);
              }}
            />
          </div>
        </div>
      )}
      <div className={styles.content}>
        <div>
          <div>
            <div>
              <div className={styles.titleContainer}>
                <h2>Billing Address</h2>
              </div>
              <div className={styles.addresses}>
                {customer?.addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`${styles.address} ${
                      selectedBillingAddress.id === address.id &&
                      styles.selected
                    }`}
                    onClick={() => {
                      setSeletedBillingAddress(address);
                    }}
                  >
                    {selectedBillingAddress.id === address.id && (
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
                <Button
                  onClick={() => {
                    setShowAddAddressForm(true);
                  }}
                >
                  Add Address
                </Button>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.titleContainer}>
              <h2>Payment Method</h2>
            </div>
            <div className={styles.shippingMethodContainer}>
              <label htmlFor="cashOnDeliveryRadio" className={styles.label}>
                <div>
                  <input
                    type="radio"
                    name="payment"
                    id="cashOnDeliveryRadio"
                    value="cashOnDelivery"
                    checked={paymentMethod === "cashOnDelivery"}
                    onChange={(event) => {
                      event.target.checked &&
                        setPaymentMethod("cashOnDelivery");
                    }}
                  />
                  <div>
                    <span>Cash On Dilevery</span>
                    <span></span>
                  </div>
                </div>
              </label>
              <label htmlFor="creditCartRadio" className={styles.label}>
                <div>
                  <input
                    type="radio"
                    name="payment"
                    id="creditCartRadio"
                    value="pickupFromStore"
                    checked={paymentMethod === "creditCart"}
                    onChange={(event) => {
                      event.target.checked && setPaymentMethod("creditCart");
                    }}
                  />
                  <div>
                    <span>Credit Cart</span>
                    <span></span>
                    <p className={styles.danger}>
                      {"(this feature is not built yet)"}
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </div>
          <div className={styles.btnContainer}>
            <Button filled>Place Order</Button>
          </div>
        </div>
        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default SelectPaymentMethod;
