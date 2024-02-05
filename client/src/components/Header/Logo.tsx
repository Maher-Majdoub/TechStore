import { useNavigate } from "react-router-dom";
import { endpoints } from "../../constants";
import logo from "../../assets/logo.svg";
import styles from "./styles.module.css";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <img
      src={logo}
      alt="logo"
      className={styles.logo}
      onClick={() => {
        navigate(endpoints["homePage"]);
      }}
    />
  );
};

export default Logo;
