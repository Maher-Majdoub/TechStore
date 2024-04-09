import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/ProductCard/ProductCard";
import Navigator from "../../components/Navigator/Navigator";
import styles from "./ProductsPage.module.css";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { endpoints } from "../../constants";
import Paginator from "../../components/Paginator/Paginator";
import ProductCardSkeleton from "../../components/ProductCard/ProductCardSkeleton";

const ProductsPage = () => {
  const location = useLocation();
  const search = new URLSearchParams(location.search).get("search");
  const tag = new URLSearchParams(location.search).get("tag");
  const { categorySlug, SubCategorySlug } = useParams();
  const [sortDirectionAsc, setSortDirectionAsc] = useState(true);
  const [sortBy, setSortBy] = useState<"name" | "unit_price">("unit_price");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const { data, isLoading, error } = useProducts({
    category: categorySlug,
    subCategory: SubCategorySlug,
    config: {
      params: {
        limit: pageSize,
        offset: pageSize * (page - 1),
        ordering: `${!sortDirectionAsc ? "-" : ""}${sortBy}`,
        search: search,
        tag: tag,
      },
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      navigate(endpoints["error"]);
    }
  }, [error]);

  const skeletons = [1, 2, 3, 4, 7, 8];

  return (
    <main className={styles.main + " container"}>
      <Navigator />
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
        <div className={styles.filter}>
          <span>View Per Page:</span>
          <select
            name="page-size"
            onChange={(event) => {
              setPageSize(parseInt(event.target.value));
            }}
            defaultValue={pageSize}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
      <Paginator
        page={page}
        pageSize={pageSize}
        total={data?.count || 7}
        onChangePage={(newPage) => {
          setPage(newPage);
        }}
      >
        <ul className={styles.list}>
          {!isLoading
            ? data?.results.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))
            : skeletons.map((s) => <ProductCardSkeleton key={s} />)}
        </ul>
      </Paginator>
    </main>
  );
};

export default ProductsPage;
