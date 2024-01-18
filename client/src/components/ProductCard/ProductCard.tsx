import { Product } from "../../hooks/useProducts";
import { GrCart } from "react-icons/gr";
import { FaRegHeart, FaBalanceScale } from "react-icons/fa";
import CheckAvailability from "../CheckAvailability/CheckAvailability";
import InStock from "../InStock/InStock";
import Review from "../Review/Review";
import styles from "./ProductCard.module.css";
import { useNavigate } from "react-router-dom";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles.card}
      onClick={() => {
        navigate(`/products/${product.slug}`);
      }}
    >
      <div className={styles.actions}>
        <div
          className={styles.action}
          onClick={(event) => {
            event.stopPropagation();
            console.log("add to wish");
          }}
        >
          <FaRegHeart />
        </div>
        <div
          className={styles.action}
          onClick={(event) => {
            event.stopPropagation();
            console.log("add to compare");
          }}
        >
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
      <span className={styles.prodName}>
        {product.name.slice(0, 50) + "..."}
      </span>
      <span className={styles.prevPrice}>${product.unit_price.toFixed(2)}</span>
      <span className={styles.currPrice}>${product.unit_price.toFixed(2)}</span>
      <div
        className={styles.addToCart}
        onClick={(event) => {
          event.stopPropagation();
          console.log("add to cart");
        }}
      >
        <GrCart />
        <span>Add To Cart</span>
      </div>
    </div>
  );
};

export default ProductCard;
