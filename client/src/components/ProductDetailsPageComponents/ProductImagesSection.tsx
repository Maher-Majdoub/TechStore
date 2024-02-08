import ActionBtn from "../ActionBtn/ActionBtn";
import ProductImagesDisplayer from "../ProductImagesDisplayer/ProductImagesDisplayer";
import { Product } from "../../hooks/useProducts";
import styles from "./styles.module.css";
import useCreateWish from "../../hooks/useCreateWish";

const ProductImagesSection = ({ product }: { product: Product }) => {
  const { createWish } = useCreateWish();
  return (
    <div className={styles.productImagesSection}>
      <div className={styles.imagesDisplayer}>
        <ProductImagesDisplayer product={product} />
        <div className={styles.actions}>
          <ActionBtn
            action="addToWish"
            onClick={() => {
              createWish({ product: product });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductImagesSection;
