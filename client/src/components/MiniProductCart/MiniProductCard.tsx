import { Product } from "../../hooks/useProducts";
import { TiPencil } from "react-icons/ti";
import { LiaTimesSolid } from "react-icons/lia";
import styles from "./MiniProductCard.module.css";

interface Props {
  product: Product;
  count: number;
  onDelete(): void;
  onModify(): void;
}

const MiniProductCard = ({ product, count, onDelete, onModify }: Props) => {
  return (
    <div className={styles.card}>
      <span className={styles.cnt}>{count} X</span>
      <img
        src={product.images[0].image}
        alt="product image"
        className={styles.img}
      />
      <span className={styles.prodName}>
        {product.name.slice(0, 60) + "..."}
      </span>
      <div className={styles.actions}>
        <button onClick={onDelete} className={styles.action}>
          <LiaTimesSolid />
        </button>
        <button onClick={onModify} className={styles.action}>
          <TiPencil />
        </button>
      </div>
    </div>
  );
};

export default MiniProductCard;
