import logo from "../../assets/logo.svg";
import CategoriesSelector from "../CategoriesSelector/CategoriesSelector";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Header.module.css";
import Icon from "../Icon/Icon";
import {
  MdOutlineCategory,
  MdAccessTime,
  MdPercent,
  MdLocalPhone,
} from "react-icons/md";
import { FaRegHeart, FaBalanceScale } from "react-icons/fa";
import CartButton from "../HeaderButtons/CartButton";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../../constants";
import useWish from "../../hooks/useWish";
import AccountButton from "../HeaderButtons/AccountButton";

const Header = () => {
  const navigate = useNavigate();
  const { data: wishes } = useWish();

  return (
    <header className={styles.header}>
      <div className={styles.topHeader + " container"}>
        <img
          src={logo}
          alt="logo"
          className={styles.logo}
          onClick={() => {
            navigate(endpoints["homePage"]);
          }}
        />
        <SearchBar />
        <div className={styles.actions}>
          <Icon count={10} onClick={() => console.log("hola")}>
            <FaBalanceScale />
          </Icon>
          <Icon
            count={wishes?.count || 0}
            onClick={() => {
              navigate(endpoints["wishlist"]);
            }}
          >
            <FaRegHeart />
          </Icon>
          <CartButton />
          <AccountButton />
        </div>
      </div>
      <div className={styles.bottomHeader + " container"}>
        <div className={styles.catSelect}>
          <CategoriesSelector />
        </div>
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
      </div>
    </header>
  );
};

export default Header;
