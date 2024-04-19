import { useNavigate, useParams } from "react-router-dom";
import useCategories, { Category } from "../../hooks/useCategories";
import Navigator from "../../components/Navigator/Navigator";
import styles from "./SubCategoriesPage.module.css";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import { endpoints } from "../../constants";
import CategoryCardSkeleton from "../../components/CategoryCard/CategoryCardSkeleton";
import LinksSection from "../../components/LinksSection/LinksSection";
import ServerError from "../../components/Error/ServerError";

const SubCategoriesPage = () => {
  const { categorySlug } = useParams();
  const { data, isLoading, error } = useCategories();

  const navigate = useNavigate();

  var subCategories = [] as Category[];

  if (data?.results) {
    data.results.map((category) => {
      if (category.slug === String(categorySlug)) {
        subCategories = category.sub_categories;
      }
    });
  }

  const skeletons = [1, 2, 3, 4, 5, 6];

  return (
    <main className={styles.container}>
      <div className="container">
        <Navigator />
        <h2 className={styles.title}>Sub Categories</h2>
        {error && <ServerError />}
        <ul className={styles.list}>
          {!isLoading
            ? subCategories.map((category) => (
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
              ))
            : skeletons.map((s) => (
                <li key={s}>
                  <CategoryCardSkeleton />
                </li>
              ))}
        </ul>
      </div>
      <LinksSection />
    </main>
  );
};

export default SubCategoriesPage;
