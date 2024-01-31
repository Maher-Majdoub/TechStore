import { useRef } from "react";
import styles from "./styles.module.css";
import Button from "../Button/Button";

const AddAddress = () => {
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

  const handleSubmition = () => {};

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
                <input ref={firstNameRef} type="text" required />
              </div>
              <div className={styles.inputGroup}>
                <span className={styles.required}>Last Name</span>
                <input ref={lastNameRef} type="text" required />
              </div>
              <div className={styles.inputGroup}>
                <span>Company</span>
                <input ref={companyRef} type="text" />
              </div>
              <div className={styles.inputGroup}>
                <span className={styles.required}>Phone Number</span>
                <input ref={phoneNumberRef} type="text" required />
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
                <input ref={addressRef} type="text" required />
              </div>
              <div className={styles.inputGroup}>
                <span className={styles.required}>Country</span>
                <input ref={countryRef} type="text" required />
              </div>
              <div className={styles.inputGroup}>
                <span className={styles.required}>State</span>
                <input ref={stateRef} type="text" required />
              </div>
              <div className={styles.inputGroup}>
                <span className={styles.required}>City</span>
                <input ref={cityRef} type="text" required />
              </div>
              <div className={styles.inputGroup}>
                <span className={styles.required}>Region</span>
                <input ref={regionRef} type="text" required />
              </div>
              <div className={styles.inputGroup}>
                <span className={styles.required}>Street Number</span>
                <input ref={streetNumberRef} type="text" required />
              </div>
              <div className={styles.inputGroup}>
                <span className={styles.required}>Postal Code</span>
                <input ref={postalCodeRef} type="text" required />
              </div>
              <div className={styles.inputGroup}>
                <span>Description</span>
                <input ref={descriptionRef} type="text" />
              </div>
              <label htmlFor="defaultBillingAddress" className={styles.flxBx}>
                <input
                  ref={is_default_billing_ref}
                  type="checkbox"
                  id="defaultBillingAddress"
                />
                <span>Use as default billing address</span>
              </label>
              <label htmlFor="defaultShippingAddress" className={styles.flxBx}>
                <input
                  ref={is_default_shipping_ref}
                  type="checkbox"
                  id="defaultShippingAddress"
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

export default AddAddress;
