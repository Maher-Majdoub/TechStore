import useCategories from "../hooks/useCategories";

const CategoriesDisplayer = () => {
  const { categories, isLoading, error } = useCategories();

  if (error) return <p>{error.message}</p>;
  return (
    <>
      {isLoading && <p>Loading....</p>}
      <ul>
        {categories?.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </>
  );
};

export default CategoriesDisplayer;
