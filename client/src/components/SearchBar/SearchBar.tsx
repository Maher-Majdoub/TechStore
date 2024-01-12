import useCategories from "../../hooks/useCategories";
import styles from "./SeachBar.module.css";

const SearchBar = () => {
  const { data } = useCategories();

  const handleSubmition = () => {
    console.log("search");
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmition();
      }}
      className={styles.form}
    >
      <input type="text" className={styles.input} />
      <select name="category" id="category_selector">
        <option value={""}>All Categories</option>
        {data?.results.map((parent_category) => (
          <optgroup key={parent_category.id} label={parent_category.name}>
            {parent_category.sub_categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <button>Seach</button>
    </form>
  );
};

export default SearchBar;