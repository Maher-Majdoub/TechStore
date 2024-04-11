import { useState } from "react";
import useDeleteWish from "../../hooks/useDeleteWish";
import useWish from "../../hooks/useWish";
import Paginator from "../Paginator/Paginator";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./styles.module.css";
import ProductCardSkeleton from "../ProductCard/ProductCardSkeleton";

const WishList = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading } = useWish(page, pageSize);

  const { deleteWish } = useDeleteWish();

  const skeletons = [1, 2, 3, 4, 5];

  return (
    <>
      <div className={styles.container}>
        <div>
          <div className={styles.titleContainer}>
            <h2>My Wish List</h2>
          </div>
          {isLoading ? (
            <ul className={styles.list}>
              {skeletons.map((s) => (
                <ProductCardSkeleton key={s} />
              ))}
            </ul>
          ) : data?.results && data.results.length > 0 ? (
            <Paginator
              page={page}
              pageSize={pageSize}
              total={data.count}
              onChangePage={(newPage) => {
                setPage(newPage);
              }}
            >
              <ul className={styles.list}>
                {data.results.map((wish) => (
                  <ProductCard
                    key={wish.id}
                    product={wish.product}
                    addToWish={false}
                    del
                    onDelete={() => {
                      deleteWish({ wishId: wish.id });
                    }}
                  />
                ))}
              </ul>
            </Paginator>
          ) : (
            <span>There is no products in your wishlist.</span>
          )}
        </div>
      </div>
    </>
  );
};

export default WishList;
