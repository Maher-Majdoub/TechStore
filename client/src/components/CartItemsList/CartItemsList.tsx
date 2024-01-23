import useCart from "../../hooks/useCart";
import StandardCartItem from "../StandardCartItem/StandardCartItem";
import styles from "./CartItemsList.module.css";

const CartItemsList = () => {
  const { cart, deleteFromCart } = useCart();
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {cart?.items.map((item) => (
          <StandardCartItem
            key={item.id}
            item={item}
            onDelete={() => deleteFromCart({ itemId: item.id })}
          />
        ))}
      </tbody>
    </table>
  );
};

export default CartItemsList;
