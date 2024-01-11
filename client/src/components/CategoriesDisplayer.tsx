import useCategories from "../hooks/useCategories";

const CategoriesDisplayer = () => {
  const { data, isLoading, error } = useCategories();

  if (error) return <p>{error.message}</p>;
  return (
    <>
      {isLoading && <p>Loading....</p>}
      <ul>
        {data?.results?.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </>
  );
};

export default CategoriesDisplayer;
