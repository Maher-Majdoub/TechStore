import { useNavigate, useParams } from "react-router-dom";
import useCategories, { Category } from "../hooks/useCategories";

const SubCategoriesPage = () => {
  const { categorySlug } = useParams();
  const { data, isLoading, error } = useCategories();

  if (error) {
    const navigate = useNavigate();
    navigate("/error");
  }

  var subCategories = [] as Category[];

  if (data?.results) {
    data.results.map((category) => {
      if (category.slug === String(categorySlug)) {
        subCategories = category.sub_categories;
      }
    });
  }

  return (
    <>
      {isLoading && <p>Loading...</p>}
      <ul>
        {subCategories.map((category) => (
          <li key={category.id}>
            <img src={category.thumbnail} alt={category.name + " image"} />
            <p>{category.name}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SubCategoriesPage;
