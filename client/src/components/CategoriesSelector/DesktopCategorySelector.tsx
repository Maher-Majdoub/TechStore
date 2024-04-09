import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { endpoints } from "../../constants";
import useCategories from "../../hooks/useCategories";
import hideOnClickOutSide from "../../services/hideOnClickOutside";
import styles from "./CategoriesSelector.module.css";
import InlineCategory from "./InlineCategory";
import InlineCategorySekeleton from "./InlineCategorySekeleton";

const DesktopCategorySelector = () => {
  const { data, isLoading } = useCategories();
  const [showMenu, toggleShowMenu] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  hideOnClickOutSide({
    ref: containerRef,
    toggleShow: toggleShowMenu,
  });

  const navigate = useNavigate();

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

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
          {!isLoading
            ? data?.results.map((parent_category) => (
                <li
                  key={parent_category.id}
                  onClick={() => {
                    toggleShowMenu(false);
                    navigate(endpoints["sub_categories"](parent_category.slug));
                  }}
                >
                  <InlineCategory
                    category={parent_category}
                    onExit={() => {
                      toggleShowMenu(false);
                    }}
                  />
                </li>
              ))
            : skeletons.map((s) => (
                <li key={s}>
                  <InlineCategorySekeleton />
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default DesktopCategorySelector;
