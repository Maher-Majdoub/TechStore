import { MdOutlineArrowRightAlt } from "react-icons/md";
import styles from "./SupportSection.module.css";
import customerSupportImage from "../../assets/cusomerSupport.png";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../../constants";

const SupportSection = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container + " container"}>
      <div className={styles.links}>
        <div
          className={styles.link}
          onClick={() => {
            navigate(endpoints["product_support"]);
          }}
        >
          <span>Product Support</span>
          <span className={styles.arrow}>
            <MdOutlineArrowRightAlt />
          </span>
        </div>
        <div
          className={styles.link}
          onClick={() => {
            navigate(endpoints["faq"]);
          }}
        >
          <span>FAQ</span>
          <span className={styles.arrow}>
            <MdOutlineArrowRightAlt />
          </span>
        </div>
        <div
          className={styles.link}
          onClick={() => {
            navigate(endpoints["buyer_guide"]);
          }}
        >
          <span>Our Buyer Guide</span>
          <span className={styles.arrow}>
            <MdOutlineArrowRightAlt />
          </span>
        </div>
      </div>
      <div>
        <img
          src={customerSupportImage}
          alt="customer support image"
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default SupportSection;
