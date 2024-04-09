import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { endpoints } from "../../constants";
import { Category } from "../../hooks/useCategories";
import CategoryCard from "../CategoryCard/CategoryCard";
import styles from "./CategoriesSelector.module.css";
import { useNavigate } from "react-router-dom";

interface Props {
  category: Category;
  onExit(): void;
}

const InlineCategory = ({ category, onExit }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <img
        src={category.thumbnail}
        alt={`${category.name} image`}
        className={styles.thumbnail}
      />
      <span>{category.name}</span>
      <MdOutlineKeyboardArrowRight />
      <div className={styles.block}>
        <div className={styles.subCategories}>
          {category.sub_categories.map((c) => (
            <div
              key={c.id}
              onClick={(event) => {
                event.stopPropagation();
                onExit();
                navigate(endpoints["category_products"](category.slug, c.slug));
              }}
            >
              <CategoryCard category={c} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InlineCategory;
