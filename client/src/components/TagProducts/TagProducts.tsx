import { Link } from "react-router-dom";
import ProductsDisplayer from "../ProductsDisplayer/ProductsDisplayer";
import styles from "./TagProducts.module.css";
import { endpoints } from "../../constants";
import useProducts from "../../hooks/useProducts";

interface Props {
  title: string;
  tag: string;
  bgImage: string;
}

const CategoryProducts = ({ tag, title, bgImage }: Props) => {
  const { data } = useProducts({
    config: {
      params: {
        limit: 10,
        tag: tag,
      },
    },
  });

  return (
    <div className={styles.container}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url('${bgImage}')` }}
      >
        <div>
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.link}>
            <Link to={endpoints["products"] + `?tag=${tag}`}>
              See All Products
            </Link>
          </span>
        </div>
      </div>
      <div className={styles.products}>
        <ProductsDisplayer products={data?.results} maxCards={5} />
      </div>
    </div>
  );
};

export default CategoryProducts;
