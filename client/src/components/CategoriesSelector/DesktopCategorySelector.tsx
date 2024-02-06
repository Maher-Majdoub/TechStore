import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdMenu, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { endpoints } from "../../constants";
import useCategories from "../../hooks/useCategories";
import hideOnClickOutSide from "../../services/hideOnClickOutside";
import CategoryCard from "../CategoryCard/CategoryCard";
import styles from "./CategoriesSelector.module.css";

const DesktopCategorySelector = () => {
  const { data } = useCategories();
  const [showMenu, toggleShowMenu] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  hideOnClickOutSide({
    ref: containerRef,
    toggleShow: toggleShowMenu,
  });

  const navigate = useNavigate();

  return (
    <div ref={containerRef} className={styles.container}>
      <button className={styles.btn} onClick={() => toggleShowMenu(!showMenu)}>
        <div className={styles.icon}>
          <MdMenu />
        </div>
        <span>Our Categories</span>
        <div className={styles.chevron}>
          {showMenu ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </button>
      <div hidden={!showMenu} className={styles.menuContainer}>
        <ul className={styles.menu}>
          {data?.results.map((parent_category) => (
            <li
              key={parent_category.id}
              onClick={() => {
                toggleShowMenu(false);
                navigate(endpoints["subCategories"](parent_category.slug));
              }}
            >
              <img
                src={parent_category.thumbnail}
                alt={`${parent_category.name} image`}
                className={styles.thumbnail}
              />
              <span>{parent_category.name}</span>
              <MdOutlineKeyboardArrowRight />
              <div>
                <div className={styles.subCategories}>
                  {parent_category.sub_categories.map((category) => (
                    <div
                      key={category.id}
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleShowMenu(false);
                        navigate(
                          endpoints["categoryProducts"](
                            parent_category.slug,
                            category.slug
                          )
                        );
                      }}
                    >
                      <CategoryCard category={category} />
                    </div>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DesktopCategorySelector;