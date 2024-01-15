import { Link } from "react-router-dom";
import { Product } from "../../hooks/useProducts";
import ProductsDisplayer from "../ProductsDisplayer/ProductsDisplayer";
import styles from "./CategoryProducts.module.css";

interface Props {
  products: Product[];
  title: string;
  bgImage: string;
  mainPageUrl: string;
}

const CategoryProducts = ({ products, title, bgImage, mainPageUrl }: Props) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url('${bgImage}')` }}
      >
        <div>
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.link}>
            <Link to={mainPageUrl}>See All Products</Link>
          </span>
        </div>
      </div>
      <div className={styles.products}>
        <ProductsDisplayer products={products} maxCards={4} />
      </div>
    </div>
  );
};

export default CategoryProducts;
