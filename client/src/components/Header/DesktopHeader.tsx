import Logo from "./Logo";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./styles.module.css";
import CategoriesSelector from "../CategoriesSelector/CategoriesSelector";
import Actions from "./Actions";
import Links from "./Links";

const DesktopHeader = () => {
  return (
    <header>
      <div className={styles.topHeader + " container"}>
        <Logo />
        <SearchBar />
        <Actions />
      </div>
      <div className={styles.bottomHeader + " container"}>
        <CategoriesSelector />
        <Links />
      </div>
    </header>
  );
};

export default DesktopHeader;
