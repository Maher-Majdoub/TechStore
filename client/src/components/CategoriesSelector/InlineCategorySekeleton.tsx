import { Skeleton } from "@mui/material";
import styles from "./CategoriesSelector.module.css";
import CategoryCardSkeleton from "../CategoryCard/CategoryCardSkeleton";

const InlineCategorySekeleton = () => {
  const subCategoriesSkeleton = [1, 2, 3, 4, 5, 6];
  return (
    <>
      <div className={styles.inlineCatSekeleton}>
        <Skeleton variant="text" sx={{ width: "15%", bgcolor: "white" }} />
        <Skeleton variant="text" sx={{ width: "50%", bgcolor: "white" }} />
        <Skeleton variant="text" sx={{ width: "10%", bgcolor: "white" }} />
      </div>
      <div className={styles.block}>
        <div className={styles.subCategories}>
          {subCategoriesSkeleton.map((s) => (
            <div key={s}>
              <CategoryCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InlineCategorySekeleton;
