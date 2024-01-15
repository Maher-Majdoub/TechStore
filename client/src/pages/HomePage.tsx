import ProductsDisplayer from "../components/ProductsDisplayer/ProductsDisplayer";
import useProducts from "../hooks/useProducts";
import styles from "./HomePage.module.css";

const HomePage = () => {
  //const navigate = useNavigate();
  const { data, isLoading, error } = useProducts({
    params: { page: 1, tag: "new" },
  });
  if (error) {
    console.error("hola");
  }

  return (
    <main>
      <div className={styles.newProds}>
        <div className={styles.options}>
          <h3 className={styles.title}>New Products</h3>
          <button className={styles.btn}>See All New Products</button>
        </div>
        {isLoading && <p>Loading....</p>}
        <ProductsDisplayer products={data ? data.results : []} />
      </div>
    </main>
  );
};

export default HomePage;
