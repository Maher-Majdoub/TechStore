import { useRef } from "react";
import styles from "./styles.module.css";
import Button from "../Button/Button";
import useCustomer, { Address } from "../../hooks/useCustomer";

interface Props {
  afterSubmition(): void;
  address?: Address;
}

const AddEditAddress = ({ afterSubmition, address }: Props) => {
  const { addAddress, editAddress } = useCustomer();

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const regionRef = useRef<HTMLInputElement>(null);
  const streetNumberRef = useRef<HTMLInputElement>(null);
  const postalCodeRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const is_default_billing_ref = useRef<HTMLInputElement>(null);
  const is_default_shipping_ref = useRef<HTMLInputElement>(null);

  const handleSubmition = () => {
    if (
      firstNameRef.current &&
      lastNameRef.current &&
      companyRef.current &&
      phoneNumberRef.current &&
      addressRef.current &&
      countryRef.current &&
      stateRef.current &&
      cityRef.current &&
      regionRef.current &&
      streetNumberRef.current &&
      postalCodeRef.current &&
      descriptionRef.current &&
      is_default_billing_ref.current &&
      is_default_shipping_ref.current
    ) {
      const newAddress: Address = {
        first_name: firstNameRef.current.value,
        last_name: lastNameRef.current.value,
        company: companyRef.current.value,
        phone_number: phoneNumberRef.current.value,
        address: addressRef.current.value,
        country: countryRef.current.value,
        state: stateRef.current.value,
        city: cityRef.current.value,
        region: regionRef.current.value,
        street_number: streetNumberRef.current.value,
        postal_code: parseInt(postalCodeRef.current.value),
        description: descriptionRef.current.value,
        is_default_billing_address: is_default_billing_ref.current.checked,
        is_default_shipping_address: is_default_shipping_ref.current.checked,
      };
      address
        ? editAddress({ id: address.id || -1, newAddress: newAddress })
        : addAddress(newAddress);
      afterSubmition();
    }
  };

  return (
    <div className={styles.container}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmition();
        }}
        className={styles.form}
      >
        <div>
          <div>
            <div className={styles.titleContainer}>
              <h2>Contact Information</h2>
            </div>
            <div className={styles.inputGroups}>
              <div className={styles.inputGroup}>
                <span className={styles.required}>First Name</span>
                <input
                  ref={firstNameRef}
                  type="text"
                  defaultValue={address?.first_name}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <span className={styles.required}>Last Name</span>
                <input
                  ref={lastNameRef}
                  type="text"
                  defaultValue={address?.last_name}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <span>Company</span>
                <input
                  ref={companyRef}
                  type="text"
                  defaultValue={address?.company}
                />
              </div>
              <div className={styles.inputGroup}>
                <span className={styles.required}>Phone Number</span>
                <input
                  ref={phoneNumberRef}
                  type="text"
                  defaultValue={address?.phone_number}
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <div className={styles.titleContainer}>
              <h2>Address</h2>
            </div>
            <div className={styles.inputGroups}>
              <div className={styles.inputGroup}>
                <span className={styles.required}>Address</span>
                <input
                  ref={addressRef}
                  type="text"
                  defaultValue={address?.address}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <span className={styles.required}>Country</span>
                <input
                  ref={countryRef}
                  type="text"
                  defaultValue={address?.country}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <span className={styles.required}>State</span>
                <input
                  ref={stateRef}
                  type="text"
                  defaultValue={address?.state}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <span className={styles.required}>City</span>
                <input
                  ref={cityRef}
                  type="text"
                  defaultValue={address?.city}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <span className={styles.required}>Region</span>
                <input
                  ref={regionRef}
                  type="text"
                  defaultValue={address?.region}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <span className={styles.required}>Street Number</span>
                <input
                  ref={streetNumberRef}
                  type="text"
                  defaultValue={address?.street_number}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <span className={styles.required}>Postal Code</span>
                <input
                  ref={postalCodeRef}
                  type="text"
                  defaultValue={address?.postal_code}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <span>Description</span>
                <input
                  ref={descriptionRef}
                  type="text"
                  defaultValue={address?.description}
                />
              </div>
              <label htmlFor="defaultBillingAddress" className={styles.flxBx}>
                <input
                  ref={is_default_billing_ref}
                  type="checkbox"
                  id="defaultBillingAddress"
                  defaultChecked={address?.is_default_billing_address}
                />
                <span>Use as default billing address</span>
              </label>
              <label htmlFor="defaultShippingAddress" className={styles.flxBx}>
                <input
                  ref={is_default_shipping_ref}
                  type="checkbox"
                  id="defaultShippingAddress"
                  defaultChecked={address?.is_default_shipping_address}
                />
                <span>Use as default shipping address</span>
              </label>
            </div>
          </div>
        </div>
        <div className={styles.btnContainer}>
          <Button>Save Address</Button>
        </div>
      </form>
    </div>
  );
};

export default AddEditAddress;
