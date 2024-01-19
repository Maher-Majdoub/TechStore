import { useNavigate, useParams } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard/ProductCard";
import styles from "./ProductsPage.module.css";

const ProductsPage = () => {
  const { categorySlug, SubCategorySlug } = useParams();
  const { data, isLoading, error } = useProducts({
    category: categorySlug,
    subCategory: SubCategorySlug,
    config: { params: { page: 1 } },
  });

  if (error) {
    const navigate = useNavigate();
    navigate("/error");
  }

  return (
    <main className={styles.main + " container"}>
      {isLoading && <p>Loading...</p>}
      <ul className={styles.list}>
        {data?.results.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </main>
  );
};

export default ProductsPage;
