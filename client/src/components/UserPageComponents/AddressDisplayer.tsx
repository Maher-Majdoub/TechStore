import { Address } from "../../hooks/useCustomer";
import styles from "./styles.module.css";

interface Props {
  address?: Address;
  name: string;
  onEdit(): void;
}

const AddressDisplayer = ({ address, name, onEdit }: Props) => {
  return (
    <div className={styles.sectionContainer}>
      <h4>Default {name}</h4>
      {address ? (
        <>
          <div className={styles.vFlxBx}>
            <span>
              {address.first_name} {address.last_name}
            </span>
            <span>{address.address}</span>
            <span>
              {address.state}, {address.postal_code}
            </span>
            <span>{address.country}</span>
            <span>T: {address.phone_number}</span>
          </div>
          <div onClick={onEdit}>
            <span className={styles.link}>Edit Address</span>
          </div>
        </>
      ) : (
        <div className={styles.centerChildren}>
          <span>You have not set a default {name}</span>
        </div>
      )}
    </div>
  );
};

export default AddressDisplayer;
