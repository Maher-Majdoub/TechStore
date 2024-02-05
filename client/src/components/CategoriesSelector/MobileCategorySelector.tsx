import { useState, useRef } from "react";
import useCategories from "../../hooks/useCategories";
import styles from "./CategoriesSelector.module.css";
import { MdMenu } from "react-icons/md";
import { LiaTimesSolid } from "react-icons/lia";
import CategoryList from "./CategoryList";
import Links from "../Header/Links";

const MobileCategorySelector = () => {
  const { data } = useCategories();
  const [showSideBar, toggleShowSideBar] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <button className={styles.btn} onClick={() => toggleShowSideBar(true)}>
        <div className={styles.icon}>
          <MdMenu />
        </div>
      </button>
      {showSideBar && (
        <div
          className={`${styles.sideBar}`}
          onClick={() => {
            toggleShowSideBar(false);
          }}
        >
          <div
            ref={containerRef}
            className={styles.content}
            onClick={(event) => {
              event?.stopPropagation();
            }}
          >
            <div className={styles.head}>
              <button
                onClick={() => {
                  toggleShowSideBar(false);
                }}
              >
                <LiaTimesSolid />
              </button>
            </div>
            <div className={styles.title}>
              <span>Our Categories</span>
            </div>
            <ul className={styles.categoriesList}>
              {data?.results.map((parent_cat) => (
                <CategoryList
                  key={parent_cat.id}
                  category={parent_cat}
                  onSelect={() => {
                    toggleShowSideBar(false);
                  }}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileCategorySelector;
