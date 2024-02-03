import { MdOutlineHeadsetMic } from "react-icons/md";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { GiPriceTag } from "react-icons/gi";
import styles from "./LinksSection.module.css";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../../constants";

const LinksSection = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container + " container"}>
      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.icon}>
            <MdOutlineHeadsetMic />
          </div>
          <h4 className={styles.title}>Product Support</h4>
          <p className={styles.discription}>
            Up to 3 years on-site warranty available for your peace of mind.
          </p>
        </div>
        <div
          className={styles.card}
          onClick={() => {
            navigate(endpoints["accountDashboard"]);
          }}
        >
          <div className={styles.icon}>
            <RiAccountPinCircleFill />
          </div>
          <h4 className={styles.title}>Personal Account</h4>
          <p className={styles.discription}>
            With big discounts, free delivery and a dedicated support
            specialist.
          </p>
        </div>
        <div className={styles.card}>
          <div className={styles.icon}>
            <GiPriceTag />
          </div>
          <h4 className={styles.title}>Amazing Savings</h4>
          <p className={styles.discription}>
            Up to 70% off new Products, you can be sure of the best price.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LinksSection;
