import { Skeleton } from "@mui/material";
import styles from "./ProductCard.module.css";

const ProductCardSkeleton = () => {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonCard}>
        <Skeleton variant="rectangular" height={150} />
        <Skeleton variant="text" sx={{ width: "50%", margin: "3px 0" }} />
        <Skeleton sx={{ fontSize: "15px" }} variant="text" />
        <Skeleton sx={{ marginTop: "-4px", fontSize: "15px" }} variant="text" />
        <Skeleton
          sx={{ fontSize: "13px", marginTop: "3px", width: "25%" }}
          variant="text"
        />
        <Skeleton
          sx={{ marginTop: "-4px", fontSize: "17px", width: "40%" }}
          variant="text"
        />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
