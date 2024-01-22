import useCart from "../hooks/useCart";

const TestCartPage = () => {
  const { cart, isLoading, isError } = useCart();
  if (isError) {
    return <h1>Something Went Wrong!</h1>;
  }
  return (
    <>
      {isLoading && <p>Loading...</p>}
      <div>{cart && cart.id}</div>
    </>
  );
};

export default TestCartPage;
