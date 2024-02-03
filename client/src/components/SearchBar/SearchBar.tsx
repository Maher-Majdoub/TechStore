import { IoSearch } from "react-icons/io5";
import styles from "./SeachBar.module.css";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { endpoints } from "../../constants";

const SearchBar = () => {
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);
  const handleSubmition = () => {
    navigate(endpoints["searchProducts"](searchRef.current?.value));
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmition();
      }}
      className={styles.form}
    >
      <input
        ref={searchRef}
        type="text"
        placeholder="Search for product..."
        className={styles.input}
      />
      <button className={styles.btn}>
        <span>
          <IoSearch />
        </span>
      </button>
    </form>
  );
};

export default SearchBar;
