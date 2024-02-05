import { Category } from "../../hooks/useCategories";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../../constants";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styles from "./CategoriesSelector.module.css";
import { useState } from "react";

interface Props {
  category: Category;
  onSelect(): void;
}

const CategoryList = ({ category, onSelect }: Props) => {
  const navigate = useNavigate();

  const [showSubCategories, toggleShowSubCategories] = useState(false);

  return (
    <li className={styles.categoryListContainer}>
      <div
        className={styles.selector}
        onClick={() => {
          toggleShowSubCategories(!showSubCategories);
        }}
      >
        <img src={category.thumbnail} className={styles.thumbnail} />
        <span>{category.name}</span>
        <div className={styles.chevron}>
          {showSubCategories ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>
      {showSubCategories && (
        <ul className={styles.subCategoriesList}>
          {category.sub_categories.map((sub_category) => (
            <li
              key={sub_category.id}
              onClick={() => {
                onSelect();
                navigate(
                  endpoints["categoryProducts"](
                    category.slug,
                    sub_category.slug
                  )
                );
              }}
            >
              <img src={sub_category.thumbnail} className={styles.thumbnail} />
              <span>{sub_category.name}</span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default CategoryList;
