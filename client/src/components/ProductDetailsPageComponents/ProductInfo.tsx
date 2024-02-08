import { Link } from "react-router-dom";
import { Product } from "../../hooks/useProducts";
import styles from "./styles.module.css";
import { Section } from "../../pages/ProductDetaillsPage/ProductDetailsPage";

interface Props {
  product: Product;
  selectedSection: Section;
}

const ProductInfo = ({ product, selectedSection }: Props) => {
  return (
    <div className={styles.prodInfos}>
      <h1 className={styles.prodName}>{product.name}</h1>
      <span className={styles.goToReview}>
        Be the first to review this product
      </span>
      <div>
        {selectedSection === "about" && (
          <p className={styles.prodDesc}>{product?.description}</p>
        )}
        {selectedSection === "details" && (
          <ul className={styles.productDetailsList}>
            {product?.configurations.map((conf) => (
              <li key={conf.id}>{conf.value}</li>
            ))}
          </ul>
        )}
        {selectedSection === "specs" && (
          <table className={styles.productSpecsTable}>
            <tbody>
              {product?.configurations.map((conf) => (
                <tr key={conf.id}>
                  <td>{conf.variation}</td>
                  <td>{conf.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className={styles.details}>
        <div className={styles.question}>
          <span>Have a Qustion?</span>
          <Link to="/contact-us">Contact Us</Link>
        </div>
        <span>{product?.reference}</span>
      </div>
    </div>
  );
};

export default ProductInfo;
