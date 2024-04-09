import { Skeleton } from "@mui/material";
import imagePlaceHolder from "../../assets/placeHolder.jpg";
import styles from "./CategoryCard.module.css";

const CategoryCardSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeletonImageContainer}>
        <img src={imagePlaceHolder} className={styles.img} />
        <div className={styles.imgSkeletonContainer}>
          <Skeleton
            variant="rectangular"
            sx={{ height: "100%", bgcolor: "#d4d4d4" }}
          />
        </div>
      </div>
      <div className={styles.text}>
        <Skeleton
          variant="text"
          sx={{ width: "40%", margin: "auto" }}
          width="40%"
        ></Skeleton>
      </div>
    </div>
  );
};

export default CategoryCardSkeleton;
