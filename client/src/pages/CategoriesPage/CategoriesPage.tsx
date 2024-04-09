import CategoryCard from "../../components/CategoryCard/CategoryCard";
import Navigator from "../../components/Navigator/Navigator";
import useCategories from "../../hooks/useCategories";
import { useNavigate } from "react-router-dom";
import styles from "./CategoriesPage.module.css";
import { endpoints } from "../../constants";
import CategoryCardSkeleton from "../../components/CategoryCard/CategoryCardSkeleton";
import LinksSection from "../../components/LinksSection/LinksSection";
import ServerError from "../../components/Error/ServerError";

const CategoriesPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useCategories();

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <main>
      <div className={styles.container + " container"}>
        <Navigator />
        {error ? (
          <ServerError />
        ) : (
          <>
            <h2 className={styles.title}>Our Categories</h2>
            <ul className={styles.list}>
              {!isLoading
                ? data?.results.map((category) => (
                    <li
                      key={category.id}
                      onClick={() => {
                        navigate(endpoints["sub_categories"](category.slug));
                      }}
                    >
                      <CategoryCard category={category} />
                    </li>
                  ))
                : skeletons.map((s) => <CategoryCardSkeleton key={s} />)}
            </ul>{" "}
          </>
        )}
      </div>
      <LinksSection />
    </main>
  );
};

export default CategoriesPage;
