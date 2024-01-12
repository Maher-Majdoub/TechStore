import { Product } from "../../hooks/useProducts";
import { GrCart } from "react-icons/gr";
import { FaRegHeart, FaBalanceScale } from "react-icons/fa";

import CheckAvailability from "../CheckAvailability/CheckAvailability";
import InStock from "../InStock/InStock";
import Review from "../Review/Review";
import styles from "./ProductCard.module.css";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.actions}>
        <div className={styles.action}>
          <FaRegHeart />
        </div>
        <div className={styles.action}>
          <FaBalanceScale />
        </div>
      </div>
      {product.inventory > 0 ? <InStock /> : <CheckAvailability />}
      <img
        src={product.images[0].image}
        alt={`${product.name} image`}
        className={styles.img}
      />
      <Review rate={4} total={4} />
      <span className={styles.prodName}>{product.name}</span>
      <span className={styles.prevPrice}>${product.unit_price.toFixed(2)}</span>
      <span className={styles.currPrice}>${product.unit_price.toFixed(2)}</span>
      <div className={styles.addToCart}>
        <GrCart />
        <span>Add To Cart</span>
      </div>
    </div>
  );
};

export default ProductCard;
