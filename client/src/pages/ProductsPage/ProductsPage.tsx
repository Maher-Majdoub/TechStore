import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./ProductsPage.module.css";
import {
  FaArrowUp,
  FaArrowDown,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const ProductsPage = () => {
  const { categorySlug, SubCategorySlug } = useParams();
  const [sortDirectionAsc, setSortDirectionAsc] = useState(true);
  const [sortBy, setSortBy] = useState<null | "name" | "unit_price">(
    "unit_price"
  );

  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useProducts({
    category: categorySlug,
    subCategory: SubCategorySlug,
    config: {
      params: {
        page: page,
        ordering: `${!sortDirectionAsc ? "-" : ""}${sortBy}`,
      },
    },
  });

  const pageSize = 20;
  const pagesCount = Math.ceil((data?.count || 0) / pageSize);

  if (error) {
    const navigate = useNavigate();
    navigate("/error");
  }

  return (
    <main className={styles.main + " container"}>
      {isLoading && <p>Loading...</p>}
      <div className={styles.filters}>
        <div className={styles.filter}>
          <span>Sort By:</span>
          <select
            name="sort"
            onChange={(event) => {
              setSortBy(event.target.value as "name" | "unit_price");
            }}
            defaultValue={"unit_price"}
          >
            <option value="unit_price">Unit Price</option>
            <option value="name">Name</option>
          </select>
          <button
            onClick={() => {
              setSortDirectionAsc(!sortDirectionAsc);
            }}
          >
            {sortDirectionAsc ? <FaArrowUp /> : <FaArrowDown />}
          </button>
        </div>
      </div>
      <ul className={styles.list}>
        {data?.results.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
      <div className={styles.pagination}>
        {data && (
          <div>
            {page !== 1 && (
              <button
                className={styles.pageSelector}
                hidden={page === 1}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setPage(page - 1);
                }}
              >
                <FaChevronLeft />
              </button>
            )}
            {Array.from({ length: pagesCount }, (_, index) => (
              <button
                key={index}
                className={`${styles.pageSelector} ${
                  page === index + 1 ? styles.selected : ""
                }`}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setPage(index + 1);
                }}
              >
                {index + 1}
              </button>
            ))}
            {page !== pagesCount && (
              <button
                className={styles.pageSelector}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setPage(page + 1);
                }}
              >
                <FaChevronRight />
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default ProductsPage;
