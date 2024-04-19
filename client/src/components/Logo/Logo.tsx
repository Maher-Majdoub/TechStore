import styles from "./Logo.module.css";
import blueUsb from "../../assets/blue_usb.png";
import whiteUsb from "../../assets/white.png";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../../constants";

const Logo = ({ color }: { color: "blue" | "white" }) => {
  const navigte = useNavigate();
  return (
    <div
      className={`${styles.container} ${
        color === "blue" ? styles.blue : styles.white
      }`}
      onClick={() => {
        navigte(endpoints["home"]);
      }}
    >
      <div className={styles.content}>
        <span className={styles.title}>TechStore</span>
        <span className={styles.subTitle}>Elevate Your Tech</span>
      </div>
      <img
        src={color === "blue" ? blueUsb : whiteUsb}
        className={styles.icon}
      />
    </div>
  );
};

export default Logo;
