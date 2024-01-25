import { useNavigate, useParams } from "react-router-dom";
import useProduct from "../../hooks/useProduct";
import styles from "./ProductDetails.module.css";
import Button from "../../components/Button/Button";
import { useState } from "react";
import AboutProduct from "../../components/AboutProduct/AboutProduct";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import ProductSpecs from "../../components/ProductSpecs/ProductSpecs";
import { Product } from "../../hooks/useProducts";
import Navigator from "../../components/Navigator/Navigator";

const ProductDetailsPage = () => {
  const { productSlug } = useParams();
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState<
    "about" | "details" | "specs"
  >("about");

  if (!productSlug) {
    navigate("/Eror Page");
    return;
  }

  const { data: product, isLoading, error } = useProduct(productSlug);

  if (error) return <h1>Cant fetch product</h1>;

  return (
    <>
      {isLoading && <p>Loading...</p>}
      <main className={styles.conatainer}>
        <div className={styles.topSection}>
          <div className="container">
            <ul className={styles.flxBx}>
              <li
                className={`${styles.navSelector} ${
                  selectedSection === "about" && styles.selected
                }`}
                onClick={() => {
                  setSelectedSection("about");
                }}
              >
                About Product
              </li>
              <li
                className={`${styles.navSelector} ${
                  selectedSection === "details" && styles.selected
                }`}
                onClick={() => {
                  setSelectedSection("details");
                }}
              >
                Details
              </li>
              <li
                className={`${styles.navSelector} ${
                  selectedSection === "specs" && styles.selected
                }`}
                onClick={() => {
                  setSelectedSection("specs");
                }}
              >
                Specs
              </li>
            </ul>
            <div className={styles.flxBx}>
              <div className={styles.price}>
                <span>On Sale from </span>
                <span>${product?.unit_price}</span>
              </div>
              <input
                type="number"
                min={1}
                max={20}
                defaultValue={1}
                className={styles.input}
              />
              <div className={styles.addToCartBtn}>
                <Button filled>Add To Cart</Button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.mainContent + " container"}>
          <div className={styles.selectedSection}>
            <div className={styles.navigator}>
              <Navigator />
            </div>
            {selectedSection === "about" && (
              <AboutProduct product={product || ({} as Product)} />
            )}
            {selectedSection === "details" && <ProductDetails />}
            {selectedSection === "specs" && <ProductSpecs />}
          </div>
          <div className={styles.productImagesSection}></div>
        </div>
      </main>
    </>
  );
};

export default ProductDetailsPage;
