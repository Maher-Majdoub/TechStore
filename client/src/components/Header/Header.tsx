import logo from "../../assets/logo.png";
import CategoriesSelector from "../CategoriesSelector/CategoriesSelector";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Header.module.css";
import Icon from "../Icon/Icon";
import { MdOutlineShoppingCart } from "react-icons/md";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="flx-bx" style={{ width: "100%" }}>
        <img src={logo} alt="logo" className="logo" />
        <SearchBar />
        <div className="flx-bx">
          <Icon count={10} onClick={() => console.log("hola")}>
            <MdOutlineShoppingCart />
          </Icon>
          <Icon count={10} onClick={() => console.log("hola")}>
            <MdOutlineShoppingCart />
          </Icon>
          <Icon count={10} onClick={() => console.log("hola")}>
            <MdOutlineShoppingCart />
          </Icon>
          <Icon onClick={() => console.log("hola")}>
            <MdOutlineShoppingCart />
          </Icon>
        </div>
      </div>
      <div className="flx-bx">
        <CategoriesSelector />
        <div className="flx-bx">
          <div>categories</div>
          <div>whats new</div>
          <div>promo</div>
          <div>call us</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
