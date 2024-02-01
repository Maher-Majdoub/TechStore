import CategoryProducts from "../../components/CategoryProduct/CategoryProducts";
import ProductsDisplayer from "../../components/ProductsDisplayer/ProductsDisplayer";
import useProducts from "../../hooks/useProducts";
import styles from "./HomePage.module.css";
import customBuildImage from "../../assets/customBuild.jpg";

const HomePage = () => {
  //const navigate = useNavigate();

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
      <div>
        <CategoryProducts
          products={data ? data.results : []}
          title="Custom Builds"
          bgImage={customBuildImage}
          mainPageUrl="/"
        />
      </div>
    </main>
  );
};

export default HomePage;
