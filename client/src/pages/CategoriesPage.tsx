import useCategories from "../hooks/useCategories";
import { useNavigate } from "react-router-dom";

const CategoriesPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useCategories();

  if (error) navigate("/error");
  return (
    <>
      {isLoading && <p>Loading...</p>}
      <ul>
        {data?.results.map((category) => (
          <li key={category.id}>
            <img src={category.thumbnail} alt={category.name + " image"} />
            <p>{category.name}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CategoriesPage;
