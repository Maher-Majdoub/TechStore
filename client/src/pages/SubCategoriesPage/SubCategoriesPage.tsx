import { useNavigate, useParams } from "react-router-dom";
import useCategories, { Category } from "../../hooks/useCategories";
import Navigator from "../../components/Navigator/Navigator";
import styles from "./SubCategoriesPage.module.css";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import { endpoints } from "../../constants";

const SubCategoriesPage = () => {
  const { categorySlug } = useParams();
  const { data, isLoading, error } = useCategories();

  const navigate = useNavigate();

  if (error) {
    navigate(endpoints["error"]);
  }

  var subCategories = [] as Category[];

  if (data?.results) {
    data.results.map((category) => {
      if (category.slug === String(categorySlug)) {
        subCategories = category.sub_categories;
      }
    });
  }

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {data && (
        <main className={styles.container + " container"}>
          <Navigator />
          <h2 className={styles.title}>Sub Categories</h2>
          <ul className={styles.list}>
            {subCategories.map((category) => (
              <li
                key={category.id}
                onClick={() => {
                  navigate(
                    endpoints["category_products"](
                      categorySlug || "",
                      category.slug
                    )
                  );
                }}
              >
                <CategoryCard category={category} />
              </li>
            ))}
          </ul>
        </main>
      )}
    </>
  );
};

export default SubCategoriesPage;
