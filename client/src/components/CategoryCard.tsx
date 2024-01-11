import { Category } from "../hooks/useCategories";
import styles from "./CategoryCard.module.css";

interface Props {
  category: Category;
}

const CategoryCard = ({ category }: Props) => {
  return (
    <div className={styles.card}>
      <img
        src={category.thumbnail}
        alt={`${category.name} image`}
        className={styles.img}
      />
      <span>{category.name}</span>
    </div>
  );
};

export default CategoryCard;
