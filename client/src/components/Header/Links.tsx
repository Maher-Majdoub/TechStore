import {
  MdOutlineCategory,
  MdAccessTime,
  MdPercent,
  MdLocalPhone,
} from "react-icons/md";
import { endpoints } from "../../constants";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const Links = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.options}>
      <div
        className={styles.option}
        onClick={() => {
          navigate(endpoints["categories"]);
        }}
      >
        <div className={styles.icon}>
          <MdOutlineCategory />
        </div>
        <span>Categories</span>
      </div>
      <div className={styles.option}>
        <div className={styles.icon}>
          <MdAccessTime />
        </div>
        <span>What's New</span>
      </div>
      <div className={styles.option}>
        <div className={styles.icon}>
          <MdPercent />
        </div>
        <span>Promo</span>
      </div>
      <div className={styles.option}>
        <div className={styles.icon}>
          <MdLocalPhone />
        </div>
        <span>Call Us</span>
      </div>
    </div>
  );
};

export default Links;
