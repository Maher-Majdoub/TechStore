import ActionBtn from "../ActionBtn/ActionBtn";
import ProductImagesDisplayer from "../ProductImagesDisplayer/ProductImagesDisplayer";
import { Product } from "../../hooks/useProducts";
import styles from "./styles.module.css";
import useCreateWish from "../../hooks/useCreateWish";
import { toast } from "react-toastify";
import useAuthorization from "../../hooks/useAuthorization";

const ProductImagesSection = ({ product }: { product: Product }) => {
  const { createWish } = useCreateWish();
  const { access } = useAuthorization();
  return (
    <div className={styles.productImagesSection}>
      <div className={styles.imagesDisplayer}>
        <ProductImagesDisplayer product={product} />
        <div className={styles.actions}>
          <ActionBtn
            action="addToWish"
            onClick={() => {
              access
                ? createWish({ product: product })
                : toast.warn("Please login first");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductImagesSection;
