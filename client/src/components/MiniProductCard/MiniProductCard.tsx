import { Product } from "../../hooks/useProducts";
import styles from "./MiniProductCard.module.css";
import ActionBtn from "../ActionBtn/ActionBtn";

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
        <ActionBtn action="delete" onClick={onDelete} />
        <ActionBtn action="modify" onClick={onModify} />
      </div>
    </div>
  );
};

export default MiniProductCard;
