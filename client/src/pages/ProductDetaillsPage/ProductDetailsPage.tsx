import { Link, useNavigate, useParams } from "react-router-dom";
import useProduct from "../../hooks/useProduct";
import styles from "./ProductDetails.module.css";
import Button from "../../components/Button/Button";
import { useRef, useState } from "react";
import Navigator from "../../components/Navigator/Navigator";
import ProductImagesDisplayer from "../../components/ProductImagesDisplayer/ProductImagesDisplayer";
import { Product } from "../../hooks/useProducts";
import ActionBtn from "../../components/ActionBtn/ActionBtn";
import useCart from "../../hooks/useCart";
import SupportSection from "../../components/SupportSection/SupportSection";

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
  const { addToCart } = useCart();
  const quantityRef = useRef<HTMLInputElement>(null);

  if (error) return <h1>Cant fetch product</h1>;

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {product && (
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
                  ref={quantityRef}
                  type="number"
                  min={1}
                  max={20}
                  defaultValue={1}
                  className={styles.input}
                />
                <div className={styles.addToCartBtn}>
                  <Button
                    filled
                    onClick={() => {
                      addToCart({
                        product: product,
                        quantity: parseInt(quantityRef.current?.value || "1"),
                      });
                      if (quantityRef.current) quantityRef.current.value = "1";
                    }}
                  >
                    Add To Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.mainContent + " container"}>
            <div className={styles.selectedSection}>
              <div className={styles.navigator}>
                <Navigator />
              </div>
              <div className={styles.prodInfos}>
                <h1 className={styles.prodName}>{product?.name}</h1>
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
            </div>
            <div className={styles.productImagesSection}>
              <div className={styles.imagesDisplayer}>
                <ProductImagesDisplayer product={product || ({} as Product)} />
                <div className={styles.actions}>
                  <ActionBtn action="addToWish" onClick={() => {}} />
                  <ActionBtn action="addToCompare" onClick={() => {}} />
                </div>
              </div>
            </div>
          </div>
          <SupportSection />
        </main>
      )}
    </>
  );
};

export default ProductDetailsPage;
