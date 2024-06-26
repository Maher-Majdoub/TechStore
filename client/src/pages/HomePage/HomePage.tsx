import TagProducts from "../../components/TagProducts/TagProducts";
import ProductsDisplayer from "../../components/ProductsDisplayer/ProductsDisplayer";
import useProducts from "../../hooks/useProducts";
import styles from "./HomePage.module.css";
import customBuildImage from "../../assets/customBuild.jpg";
import msiLogoImage from "../../assets/msiLogo.jpg";
import desktopImage from "../../assets/desktop.jpg";
import monitorImage from "../../assets/monitor.jpg";
import LinksSection from "../../components/LinksSection/LinksSection";
import { Link } from "react-router-dom";
import { endpoints } from "../../constants";
import SupportSection from "../../components/SupportSection/SupportSection";

const HomePage = () => {
  const { data } = useProducts({
    config: {
      params: { page: 1, tag: "new" },
    },
  });

  return (
    <main>
      <div className="container">
        <div className={styles.newProds}>
          <div className={styles.options}>
            <h3 className={styles.title}>New Products</h3>
            <Link to={`${endpoints.products}?tag=new`} className={styles.btn}>
              See All New Products
            </Link>
          </div>
          <ProductsDisplayer products={data?.results} />
        </div>
        <TagProducts
          tag="custom_builds"
          title="Custom Builds"
          bgImage={customBuildImage}
        />
        <TagProducts
          tag="msi_laptops"
          title="MSI Laptops"
          bgImage={msiLogoImage}
        />
        <TagProducts tag="desktops" title="Desktops" bgImage={desktopImage} />
        <TagProducts
          tag="gaming_monitors"
          title="Gaming Monitors"
          bgImage={monitorImage}
        />
      </div>
      <SupportSection />
      <LinksSection />
    </main>
  );
};

export default HomePage;
