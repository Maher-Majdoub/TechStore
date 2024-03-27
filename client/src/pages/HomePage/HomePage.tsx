import TagProducts from "../../components/TagProducts/TagProducts";
import ProductsDisplayer from "../../components/ProductsDisplayer/ProductsDisplayer";
import useProducts from "../../hooks/useProducts";
import styles from "./HomePage.module.css";
import customBuildImage from "../../assets/customBuild.jpg";
import msiLogoImage from "../../assets/msiLogo.jpg";
import desktopImage from "../../assets/desktop.jpg";
import monitorImage from "../../assets/monitor.jpg";
import LinksSection from "../../components/LinksSection/LinksSection";

const HomePage = () => {
  const { data, isLoading, error } = useProducts({
    config: {
      params: { page: 1, tag: "new" },
    },
  });

  if (error) {
    console.error("hola");
  }

  return (
    <main className="container">
      <div className={styles.newProds}>
        <div className={styles.options}>
          <h3 className={styles.title}>New Products</h3>
          <button className={styles.btn}>See All New Products</button>
        </div>
        {isLoading && <p>Loading....</p>}
        <ProductsDisplayer products={data ? data.results : []} />
      </div>
      <TagProducts tag="new" title="Custom Builds" bgImage={customBuildImage} />
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
      <LinksSection />
    </main>
  );
};

export default HomePage;
