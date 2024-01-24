import Navigator from "../components/Navigator/Navigator";
import useCategories from "../hooks/useCategories";
import { useNavigate } from "react-router-dom";

const CategoriesPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useCategories();

  if (error) navigate("/error");
  return (
    <>
      {isLoading && <p>Loading...</p>}
      <main>
        <Navigator />
        <ul>
          {data?.results.map((category) => (
            <li
              key={category.id}
              onClick={() => {
                navigate(`/categories/${category.slug}/`);
              }}
            >
              <img src={category.thumbnail} alt={category.name + " image"} />
              <p>{category.name}</p>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default CategoriesPage;
