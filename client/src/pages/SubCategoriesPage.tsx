import { useNavigate, useParams } from "react-router-dom";
import useCategories, { Category } from "../hooks/useCategories";
import Navigator from "../components/Navigator/Navigator";

const SubCategoriesPage = () => {
  const { categorySlug } = useParams();
  const { data, isLoading, error } = useCategories();

  const navigate = useNavigate();

  if (error) {
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
      <main>
        <Navigator />
        <ul>
          {subCategories.map((category) => (
            <li
              key={category.id}
              onClick={() => {
                navigate(`/categories/${categorySlug}/${category.slug}/`);
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

export default SubCategoriesPage;
