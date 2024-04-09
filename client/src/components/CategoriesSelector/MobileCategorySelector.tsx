import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { LiaTimesSolid } from "react-icons/lia";
import { Modal } from "@mui/material";
import CategoryList from "./CategoryList";
import useCategories from "../../hooks/useCategories";
import styles from "./CategoriesSelector.module.css";
import Links from "../Header/Links";

const MobileCategorySelector = () => {
  const { data } = useCategories();
  const [showSideBar, toggleShowSideBar] = useState(false);

  return (
    <div>
      <button className={styles.btn} onClick={() => toggleShowSideBar(true)}>
        <div className={styles.icon}>
          <MdMenu />
        </div>
      </button>
      <Modal
        open={showSideBar}
        onClose={() => {
          toggleShowSideBar(false);
        }}
        sx={{
          width: "80%",
          overflowY: "auto",
        }}
      >
        <div className={styles.sidebarContainer}>
          <div className={styles.head}>
            <button
              onClick={() => {
                toggleShowSideBar(false);
              }}
            >
              <LiaTimesSolid />
            </button>
          </div>
          <div className={styles.content}>
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
            <div
              className={styles.links}
              onClick={() => {
                toggleShowSideBar(false);
              }}
            >
              <Links />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MobileCategorySelector;
