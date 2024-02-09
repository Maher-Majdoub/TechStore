import {
  MdOutlineCategory,
  MdInfoOutline,
  MdMailOutline,
} from "react-icons/md";
import { AiOutlineQuestionCircle } from "react-icons/ai";
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
      <div
        className={styles.option}
        onClick={() => {
          navigate(endpoints["about_us"]);
        }}
      >
        <div className={styles.icon}>
          <MdInfoOutline />
        </div>
        <span>About Us</span>
      </div>
      <div
        className={styles.option}
        onClick={() => {
          navigate(endpoints["contact_us"]);
        }}
      >
        <div className={styles.icon}>
          <MdMailOutline />
        </div>
        <span>Contact Us</span>
      </div>
      <div
        className={styles.option}
        onClick={() => {
          navigate(endpoints["faq"]);
        }}
      >
        <div className={styles.icon}>
          <AiOutlineQuestionCircle />
        </div>
        <span>FAQ</span>
      </div>
    </div>
  );
};

export default Links;
