import useDeleteWish from "../../hooks/useDeleteWish";
import useWish from "../../hooks/useWish";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./styles.module.css";

const WishList = () => {
  const { data, isLoading, isError } = useWish();
  const {
    deleteWish,
    isSuccess: isDeleteWishSuccess,
    isPending: isDeleteWishPending,
    isError: isDeleteWishError,
  } = useDeleteWish();

  if (isError) console.error("somthing went wrong");
  if (isDeleteWishSuccess) console.log("wish deleted");
  if (isDeleteWishError)
    console.error("something went wrong when deleting wish");

  return (
    <>
      {isLoading && <p>Loading....</p>}
      {data && (
        <div className={styles.container}>
          <div>
            <div className={styles.titleContainer}>
              <h2>My Wish List</h2>
            </div>
            <ul className={styles.list}>
              {data.map((wish) => (
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
            {isDeleteWishPending && <p>deleting wish</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default WishList;
