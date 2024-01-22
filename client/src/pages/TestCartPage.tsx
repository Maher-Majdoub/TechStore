import ProductCard from "../components/ProductCard/ProductCard";
import useCart from "../hooks/useCart";

const TestCartPage = () => {
  const { cart, isLoading, isError } = useCart();
  if (isError) {
    return <h1>Something Went Wrong!</h1>;
  }
  return (
    <>
      {isLoading && <p>Loading...</p>}
      <div>
        <h3>{cart && cart.id}</h3>
        <ul>
          {cart?.items.map((item) => (
            <ProductCard key={item.id} product={item.product} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default TestCartPage;
