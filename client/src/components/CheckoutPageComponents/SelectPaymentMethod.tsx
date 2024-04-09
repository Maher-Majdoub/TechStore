import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { endpoints } from "../../constants";
import { MdOutlineDone } from "react-icons/md";
import { toast } from "react-toastify";
import UseOrder, { PaymentMethod, ShippingMethod } from "../../hooks/useOrder";
import useCustomer, { Address } from "../../hooks/useCustomer";
import Button from "../Button/Button";
import OrderSummary from "../OrderSummary/OrderSummary";
import useCart from "../../hooks/useCart";
import PopupAddressForm from "./PopupAddressForm";
import styles from "./styles.module.css";

interface Props {
  selectedShippingAddress: Address;
  shippingMethod: ShippingMethod;
}

const SelectPaymentMethod = ({
  selectedShippingAddress,
  shippingMethod,
}: Props) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { customer } = useCustomer();

  const { createOrder, isCreateOrderSuccess, isCreateOrderPending } =
    UseOrder();

  const defaultBillingAddress = customer?.addresses.find(
    (address) => address.is_default_billing_address
  );

  const [selectedBillingAddress, setSeletedBillingAddress] = useState<Address>(
    defaultBillingAddress as Address
  );

  const [showAddAddressForm, setShowAddAddressForm] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.CashOnDelivery
  );
  const { cart } = useCart();

  useEffect(() => {
    if (!shippingMethod || !selectedShippingAddress) {
      toast.warn("Please select your shipping address first");
      navigate(endpoints["checkout"]);
    }
  }, []);

  useEffect(() => {
    if (isCreateOrderSuccess) {
      queryClient.resetQueries({ queryKey: ["cart"] });
      navigate(endpoints["home"]);
    }
  }, [isCreateOrderSuccess]);

  if (cart)
    return (
      <div>
        <PopupAddressForm
          open={showAddAddressForm}
          onClose={() => {
            setShowAddAddressForm(false);
          }}
        />
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
                      checked={paymentMethod === PaymentMethod.CashOnDelivery}
                      onChange={(event) => {
                        event.target.checked &&
                          setPaymentMethod(PaymentMethod.CashOnDelivery);
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
                      checked={paymentMethod === PaymentMethod.CreditCart}
                      onChange={(event) => {
                        event.target.checked &&
                          setPaymentMethod(PaymentMethod.CreditCart);
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
                <label htmlFor="paypalRadio" className={styles.label}>
                  <div>
                    <input
                      type="radio"
                      name="payment"
                      id="paypalRadio"
                      checked={paymentMethod === PaymentMethod.PayPal}
                      onChange={(event) => {
                        event.target.checked &&
                          setPaymentMethod(PaymentMethod.PayPal);
                      }}
                    />
                    <div>
                      <span>PayPal</span>
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
              {isCreateOrderPending && <span>Creating Order</span>}
              <Button
                filled
                onClick={() => {
                  createOrder({
                    cart_id: cart.id,
                    shipping_method: shippingMethod,
                    shipping_address: selectedShippingAddress.id || -1,
                    payment_method: paymentMethod,
                    billing_address: selectedBillingAddress.id || -1,
                  });
                }}
              >
                Place Order
              </Button>
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
