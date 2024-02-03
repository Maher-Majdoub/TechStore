import CategoryCard from "../../components/CategoryCard/CategoryCard";
import Navigator from "../../components/Navigator/Navigator";
import useCategories from "../../hooks/useCategories";
import { useNavigate } from "react-router-dom";
import styles from "./CategoriesPage.module.css";
import { endpoints } from "../../constants";

const CategoriesPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useCategories();

  if (error) navigate(endpoints["error"]);
  return (
    <>
      {isLoading && <p>Loading...</p>}
      <main className={styles.container + " container"}>
        <Navigator />
        <h2 className={styles.title}>Our Categories</h2>
        <ul className={styles.list}>
          {data?.results.map((category) => (
            <li
              key={category.id}
              onClick={() => {
                navigate(endpoints["subCategories"](category.slug));
              }}
            >
              <CategoryCard category={category} />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default CategoriesPage;
