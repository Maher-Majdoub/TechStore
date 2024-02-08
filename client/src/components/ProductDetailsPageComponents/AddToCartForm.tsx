import { useRef } from "react";
import Button from "../Button/Button";
import useCart from "../../hooks/useCart";
import { Product } from "../../hooks/useProducts";
import styles from "./styles.module.css";

const AddToCartForm = ({ product }: { product: Product }) => {
  const quantityRef = useRef<HTMLInputElement>(null);

  const { addToCart } = useCart();
  return (
    <div className={styles.flxBx}>
      <div className={styles.price}>
        <span>On Sale from </span>
        <span>${product?.unit_price}</span>
      </div>
      <input
        ref={quantityRef}
        type="number"
        min={1}
        max={20}
        defaultValue={1}
        className={styles.input}
      />
      <div className={styles.addToCartBtn}>
        <Button
          filled
          onClick={() => {
            addToCart({
              product: product,
              quantity: parseInt(quantityRef.current?.value || "1"),
            });
            if (quantityRef.current) quantityRef.current.value = "1";
          }}
        >
          Add To Cart
        </Button>
      </div>
    </div>
  );
};

export default AddToCartForm;
