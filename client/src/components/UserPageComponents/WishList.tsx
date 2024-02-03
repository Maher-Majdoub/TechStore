import useWish from "../../hooks/useWish";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./styles.module.css";

const WishList = () => {
  const { data, isLoading, isError } = useWish();

  if (isError) console.error("somthing went wrong");

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
                <ProductCard key={wish.id} product={wish.product} />
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default WishList;
