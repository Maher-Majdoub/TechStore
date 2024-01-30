import { useRef } from "react";
import styles from "./TestAddAddress.module.css";
import useCustomer, { Address } from "../hooks/useCustomer";

const TestAddAddress = () => {
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

  const { addAddress } = useCustomer();

  const handleSubmition = () => {
    const address: Address = {
      address: addressRef.current?.value || "",
      city: cityRef.current?.value || "",
      company: companyRef.current?.value || "",
      country: countryRef.current?.value || "",
      description: descriptionRef.current?.value || "",
      first_name: firstNameRef.current?.value || "",
      is_default_billing_address:
        is_default_billing_ref.current?.checked || false,
      is_default_shipping_address:
        is_default_shipping_ref.current?.checked || false,
      last_name: lastNameRef.current?.value || "",
      phone_number: phoneNumberRef.current?.value || "",
      postal_code: parseInt(postalCodeRef.current?.value || ""),
      region: regionRef.current?.value || "",
      state: stateRef.current?.value || "",
      street_number: parseInt(streetNumberRef.current?.value || ""),
    };
    addAddress(address);
  };

  return (
    <>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          handleSubmition();
        }}
        className={styles.form}
      >
        <input
          ref={firstNameRef}
          type="text"
          placeholder="first name"
          required
        />
        <input ref={lastNameRef} type="text" placeholder="last name" required />
        <input ref={companyRef} type="text" placeholder="company" />
        <input
          ref={phoneNumberRef}
          type="text"
          placeholder="phone number"
          required
        />
        <input ref={addressRef} type="text" placeholder="address" required />
        <input ref={countryRef} type="text" placeholder="country" required />
        <input ref={stateRef} type="text" placeholder="state" required />
        <input ref={cityRef} type="text" placeholder="city" required />
        <input ref={regionRef} type="text" placeholder="region" required />
        <input
          ref={streetNumberRef}
          type="text"
          placeholder="street number"
          required
        />
        <input
          ref={postalCodeRef}
          type="text"
          placeholder="postal code"
          required
        />
        <input
          ref={descriptionRef}
          type="text"
          placeholder="description"
          required
        />
        <span>billing address</span>
        <input ref={is_default_billing_ref} type="checkbox" />
        <span>shipping address</span>
        <input ref={is_default_shipping_ref} type="checkbox" />
        <input type="submit" />
      </form>
    </>
  );
};

export default TestAddAddress;
