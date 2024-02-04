import { useState } from "react";
import styles from "./styles.module.css";
import AddEditAddress from "../UserPageComponents/AddEditAddress";
import useCustomer, { Address } from "../../hooks/useCustomer";
import { MdOutlineDone } from "react-icons/md";
import Button from "../Button/Button";
import OrderSummary from "../OrderSummary/OrderSummary";
import { ShippingMethod } from "../../hooks/useOrder";

interface Props {
  onSubmit(
    selectedShippingAddress: Address,
    shippingMethod: ShippingMethod
  ): void;
}

const SelectShippingMethod = ({ onSubmit }: Props) => {
  const { customer } = useCustomer();
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>(
    ShippingMethod.StandardShipping
  );

  const defaultShippingAddress = customer?.addresses.find(
    (address) => address.is_default_shipping_address
  );
  const [selectedShippingAddress, setSeletedAddress] = useState<Address>(
    defaultShippingAddress as Address
  );

  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  if (customer)
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
                  <h2>Shipping Address</h2>
                </div>
                <div className={styles.addresses}>
                  {customer?.addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`${styles.address} ${
                        selectedShippingAddress?.id === address.id &&
                        styles.selected
                      }`}
                      onClick={() => {
                        setSeletedAddress(address);
                      }}
                    >
                      {selectedShippingAddress?.id === address.id && (
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
              <div>
                <div className={styles.titleContainer}>
                  <h2>Shipping Method</h2>
                </div>
                <div className={styles.shippingMethodContainer}>
                  <label
                    htmlFor="standardShippingRadio"
                    className={styles.label}
                  >
                    <h6>Standard Rate</h6>
                    <div>
                      <input
                        type="radio"
                        id="standardShippingRadio"
                        checked={
                          shippingMethod === ShippingMethod.StandardShipping
                        }
                        onChange={(event) => {
                          event.target.checked &&
                            setShippingMethod(ShippingMethod.StandardShipping);
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
                        checked={
                          shippingMethod === ShippingMethod.PickupInStore
                        }
                        onChange={(event) => {
                          event.target.checked &&
                            setShippingMethod(ShippingMethod.PickupInStore);
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
                <Button
                  filled
                  onClick={() => {
                    onSubmit(selectedShippingAddress, shippingMethod);
                  }}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.orderSummary}>
            <OrderSummary />
          </div>
        </div>
      </div>
    );
};

export default SelectShippingMethod;
