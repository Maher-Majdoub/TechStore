import useProducts from "../../hooks/useProducts";

const ProductsDisplayer = () => {
  const { data, isLoading, error } = useProducts();

  if (error) return <p>{error.message}</p>;

  return (
    <>
      {isLoading && <p>Loading....</p>}
      <ul>
        {data?.results.map((prod) => (
          <li key={prod.id}>
            <img src={prod.images[0].image} alt="image" width="50px" />
            <p>{prod.name}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductsDisplayer;
