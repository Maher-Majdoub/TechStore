import CategoriesSelector from "../CategoriesSelector/CategoriesSelector";
import SearchBar from "../SearchBar/SearchBar";
import Actions from "./Actions";
import Logo from "../Logo/Logo";
import styles from "./styles.module.css";

const MobileHeader = () => {
  return (
    <header>
      <div className={styles.topHeader + " container"}>
        <Logo color="white" />
      </div>
      <div className={styles.bottomHeader + " container"}>
        <CategoriesSelector />
        <SearchBar />
        <Actions />
      </div>
    </header>
  );
};

export default MobileHeader;
