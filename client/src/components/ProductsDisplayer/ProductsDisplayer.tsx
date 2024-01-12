import useProducts from "../../hooks/useProducts";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductDisplayer.module.css";

const ProductsDisplayer = () => {
  const { data, isLoading, error } = useProducts();

  if (error) return <p>{error.message}</p>;

  return (
    <>
      {isLoading && <p>Loading....</p>}
      <div className={styles.displayer}>
        {data?.results.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </>
  );
};

export default ProductsDisplayer;
