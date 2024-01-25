import { Link } from "react-router-dom";
import { Product } from "../../hooks/useProducts";
import Navigator from "../Navigator/Navigator";
import styles from "./AboutProduct.module.css";

interface Props {
  product: Product;
}

const AboutProduct = ({ product }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.navigator}>
        <Navigator />
      </div>
      <div className={styles.content}>
        <h1 className={styles.prodName}>{product.name}</h1>
        <span className={styles.goToReview}>
          Be the first to review this product
        </span>
        <p className={styles.prodDesc}>{product.description}</p>
        <div className={styles.details}>
          <div className={styles.question}>
            <span>Have a Qustion?</span>
            <Link to="/contact-us">Contact Us</Link>
          </div>
          <span>{product.reference}</span>
        </div>
      </div>
    </div>
  );
};

export default AboutProduct;
