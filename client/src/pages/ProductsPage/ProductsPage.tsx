import { useParams, useSearchParams } from "react-router-dom";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/ProductCard/ProductCard";
import Navigator from "../../components/Navigator/Navigator";
import ProductCardSkeleton from "../../components/ProductCard/ProductCardSkeleton";
import styles from "./ProductsPage.module.css";
import LinksSection from "../../components/LinksSection/LinksSection";
import Error from "../../components/Error/Error";
import ServerError from "../../components/Error/ServerError";
import { Pagination } from "@mui/material";
import { useEffect } from "react";

const ProductsPage = () => {
  const { categorySlug, SubCategorySlug } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    page: searchParams.get("page")
      ? parseInt(searchParams.get("page") as string)
      : 1,
    pageSize: searchParams.get("page_size")
      ? parseInt(searchParams.get("page_size") as string)
      : 10,
    sortBy: searchParams.get("ordering")
      ? searchParams.get("ordering")
      : "unit_price",
    sortDirectionAsc: searchParams.get("sort_direction_asc") !== "false",
    tag: searchParams.get("tag"),
    search: searchParams.get("search"),
  };

  const { data, isLoading, error } = useProducts({
    category: categorySlug,
    subCategory: SubCategorySlug,
    config: {
      params: {
        limit: filters.pageSize,
        offset: filters.pageSize * (filters.page - 1),
        ordering: `${!filters.sortDirectionAsc ? "-" : ""}${filters.sortBy}`,
        search: filters.search,
        tag: filters.tag,
      },
    },
  });

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    key !== "page" && params.set("page", "1");
    setSearchParams(params.toString());
  };

  useEffect(() => {
    if (
      data &&
      Math.ceil(data.count / filters.pageSize) < filters.page &&
      filters.page !== 1
    ) {
      updateParams("page", "1");
    }
  }, [filters]);

  const skeletons = [1, 2, 3, 4, 7, 8];

  return (
    <main className={styles.main}>
      <div className={styles.content + " container"}>
        <Navigator />
        {error ? (
          <ServerError />
        ) : (!isLoading && data === undefined) || data?.count == 0 ? (
          <Error
            title="No Product Found..."
            content="You Can Check Out Different Categories..."
            goHome
          />
        ) : (
          <>
            <div className={styles.filters}>
              <div className={styles.filter}>
                <span>Sort By:</span>
                <select
                  name="sort"
                  onChange={(event) => {
                    updateParams("ordering", event.target.value);
                  }}
                  defaultValue={"unit_price"}
                >
                  <option value="unit_price">Unit Price</option>
                  <option value="name">Name</option>
                </select>
                <button
                  onClick={() => {
                    updateParams(
                      "sort_direction_asc",
                      (!filters.sortDirectionAsc).toString()
                    );
                  }}
                >
                  {filters.sortDirectionAsc ? <FaArrowUp /> : <FaArrowDown />}
                </button>
              </div>
              <div className={styles.filter}>
                <span>View Per Page:</span>
                <select
                  name="page-size"
                  onChange={(event) => {
                    updateParams("page_size", event.target.value);
                  }}
                  defaultValue={filters.pageSize}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>
            </div>
            <ul className={styles.list}>
              {!isLoading
                ? data?.results.map((product) => (
                    <li key={product.id}>
                      <ProductCard product={product} />
                    </li>
                  ))
                : skeletons.map((s) => <ProductCardSkeleton key={s} />)}
            </ul>

            {data && data.count / filters.pageSize > 1 && (
              <Pagination
                count={Math.ceil(data.count / filters.pageSize)}
                page={filters.page}
                onChange={(_, page) => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  updateParams("page", page.toString());
                }}
                sx={{ width: "fit-content", margin: "auto" }}
                size="medium"
                color="primary"
              />
            )}
          </>
        )}
      </div>
      <LinksSection />
    </main>
  );
};

export default ProductsPage;
