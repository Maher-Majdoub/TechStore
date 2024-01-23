import { useState } from "react";
import { CartItem } from "../../hooks/useCart";
import styles from "./StandardCartItem.module.css";
import ActionBtn from "../ActionBtn/ActionBtn";

interface Props {
  item: CartItem;
  onDelete(): void;
}

const StandardCartItem = ({ item, onDelete }: Props) => {
  const [qty, setQty] = useState(item.quantity);
  return (
    <tr className={styles.container}>
      <td className={styles.td}>
        <div className={styles.flxBx}>
          <img
            src={item.product.images[0]?.image}
            alt={item.product.name + " image"}
            className={styles.prodImage}
          />
          <p className={styles.prodName}>{item.product.name}</p>
        </div>
      </td>
      <td className={styles.td}>${item.product.unit_price}</td>
      <td className={styles.td}>
        <input
          type="number"
          className={styles.qty}
          defaultValue={item.quantity}
          min={1}
          max={20}
          onChange={(event) => {
            setQty(parseInt(event.target.value) || 1);
          }}
        />
      </td>
      <td className={styles.td}>
        ${(qty * item.product.unit_price).toFixed(2)}{" "}
      </td>
      <td className={styles.td}>
        <div className={styles.actions}>
          <ActionBtn action="delete" onClick={onDelete} />
        </div>
      </td>
    </tr>
  );
};

export default StandardCartItem;
