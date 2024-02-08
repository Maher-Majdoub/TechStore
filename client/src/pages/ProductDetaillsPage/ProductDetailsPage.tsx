import { useNavigate, useParams } from "react-router-dom";
import useProduct from "../../hooks/useProduct";
import styles from "./ProductDetails.module.css";
import { useState } from "react";
import Navigator from "../../components/Navigator/Navigator";
import SupportSection from "../../components/SupportSection/SupportSection";
import ProductInfoSection from "../../components/ProductInfoSection/ProductInfoSection";
import LinksSection from "../../components/LinksSection/LinksSection";
import { endpoints, screenWidths } from "../../constants";
import { useWindowSize } from "@uidotdev/usehooks";
import ProductImagesSection from "../../components/ProductDetailsPageComponents/ProductImagesSection";
import ProductInfo from "../../components/ProductDetailsPageComponents/ProductInfo";
import SectionSelector from "../../components/ProductDetailsPageComponents/SectionSelector";
import AddToCartForm from "../../components/ProductDetailsPageComponents/AddToCartForm";

export type Section = "about" | "details" | "specs";

const ProductDetailsPage = () => {
  const { productSlug } = useParams();
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState<Section>("about");

  if (!productSlug) {
    navigate(endpoints["error"]);
    return;
  }

  const { data: product, isLoading, error } = useProduct(productSlug);

  const { width } = useWindowSize();

  if (error) return <h1>Cant fetch product</h1>;

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {product && (
        <>
          <main className={styles.conatainer}>
            {width && width > screenWidths["tablets"] ? (
              <>
                <div className={styles.topSection}>
                  <div className="container">
                    <SectionSelector
                      selectedSection={selectedSection}
                      setSelectedSection={setSelectedSection}
                    />
                    <AddToCartForm product={product} />
                  </div>
                </div>
                <div className={styles.mainContent + " container"}>
                  <div className={styles.selectedSection}>
                    <div className={styles.navigator}>
                      <Navigator />
                    </div>
                    <ProductInfo
                      product={product}
                      selectedSection={selectedSection}
                    />
                  </div>
                  <ProductImagesSection product={product} />
                </div>
              </>
            ) : (
              <div className={styles.mobileContainer + " container"}>
                <ProductImagesSection product={product} />
                <SectionSelector
                  selectedSection={selectedSection}
                  setSelectedSection={setSelectedSection}
                />
                <ProductInfo
                  product={product}
                  selectedSection={selectedSection}
                />
                <AddToCartForm product={product} />
              </div>
            )}
            <ProductInfoSection infos={product.infos} />
            <SupportSection />
            <LinksSection />
          </main>
        </>
      )}
    </>
  );
};

export default ProductDetailsPage;
