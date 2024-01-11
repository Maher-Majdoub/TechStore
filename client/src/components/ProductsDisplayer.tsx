import { useState } from "react";
import useProducts from "../hooks/useProducts";

const ProductsDisplayer = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useProducts(page);

  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>Loading..</p>;

  return (
    <>
      <ul>
        {data?.results.map((product) => (
          <li>{product.name}</li>
        ))}
      </ul>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          disabled={data?.previous === null}
          onClick={() => setPage(page - 1)}
        >
          {"<"}
        </button>
        <p>{page}</p>
        <button
          disabled={data?.next === null}
          onClick={() => setPage(page + 1)}
        >
          {">"}
        </button>
      </div>
    </>
  );
};

export default ProductsDisplayer;
