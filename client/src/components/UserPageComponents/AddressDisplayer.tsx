import { Address } from "../../hooks/useCustomer";
import styles from "./styles.module.css";

interface Props {
  address?: Address;
  name: string;
}

const AddressDisplayer = ({ address, name }: Props) => {
  return (
    <div className={styles.sectionContainer}>
      <h4>Default {name}</h4>
      {address ? (
        <div className={styles.vFlxBx}>
          <span>
            {address.first_name} {address.last_name}
          </span>
          <span>{address.addresss}</span>
          <span>
            {address.state}, {address.postal_code}
          </span>
          <span>{address.country}</span>
          <span>T: {address.phone_number}</span>
        </div>
      ) : (
        <span>You have not set a default {name}</span>
      )}
      <span className={styles.link}>Edit {name}</span>
    </div>
  );
};

export default AddressDisplayer;
