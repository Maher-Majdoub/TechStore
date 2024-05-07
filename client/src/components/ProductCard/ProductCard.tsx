import { Product } from "../../hooks/useProducts";
import { GrCart } from "react-icons/gr";
import CheckAvailability from "../CheckAvailability/CheckAvailability";
import InStock from "../InStock/InStock";
import Review from "../Review/Review";
import styles from "./ProductCard.module.css";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { endpoints } from "../../constants";
import useCreateWish from "../../hooks/useCreateWish";
import ActionBtn from "../ActionBtn/ActionBtn";
import noProductImage from "../../assets/noProductImage.png";
import useAuthorization from "../../hooks/useAuthorization";
import { toast } from "react-toastify";

interface Props {
  product: Product;
  addToWish?: boolean;
  addToCompare?: boolean;
  del?: boolean;
  onDelete?(): void;
}

const ProductCard = ({
  product,
  addToWish = true,
  addToCompare = true,
  del = false,
  onDelete = () => {},
}: Props) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { createWish } = useCreateWish();
  const { access } = useAuthorization();

  return (
    <div className={styles.container}>
      <div
        className={styles.card}
        onClick={() => {
          navigate(
            endpoints["product_details"](
              product.category.parent_category.slug,
              product.category.slug,
              product.slug
            )
          );
        }}
      >
        <div className={styles.actions}>
          {del && <ActionBtn action="delete" onClick={onDelete} />}
          {addToWish && (
            <ActionBtn
              action="addToWish"
              onClick={() => {
                access
                  ? createWish({ product: product })
                  : toast.warn("Please login first");
              }}
            />
          )}
          {addToCompare && (
            <ActionBtn
              action="view"
              onClick={() => {
                navigate(
                  endpoints["product_details"](
                    product.category.parent_category.slug,
                    product.category.slug,
                    product.slug
                  )
                );
              }}
            />
          )}
        </div>
        {product.inventory > 0 ? <InStock /> : <CheckAvailability />}
        <img
          src={
            product.images.length > 0 ? product.images[0].image : noProductImage
          }
          alt={`${product.name} image`}
          className={styles.img}
        />
        <Review rate={4} total={4} />
        <span className={styles.prodName}>
          {product.description.slice(0, 50) + "..."}
        </span>
        <span
          className={`${styles.prevPrice} ${
            product.discount == 0 && styles.invisible
          }`}
        >
          ${product.unit_price.toFixed(2)}
        </span>
        <span className={styles.currPrice}>
          ${(product.unit_price * (1 - product.discount)).toFixed(2)}
        </span>
        <div
          className={styles.addToCart}
          onClick={(event) => {
            event.stopPropagation();
            addToCart({ product: product, quantity: 1 });
          }}
        >
          <GrCart />
          <span>Add To Cart</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
