import MiniProductCard from "../components/MiniProductCart/MiniProductCard";
import useCart from "../hooks/useCart";

const TestCartPage = () => {
  const { cart, isLoading, isError } = useCart();
  if (isError) {
    return <h1>Something Went Wrong!</h1>;
  }
  console.log(cart);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      <div>
        <h3>{cart && cart.id}</h3>
        <ul>
          {cart?.items?.map((item) => (
            <div key={item.product.id}>
              <MiniProductCard
                product={item.product}
                onDelete={() => {}}
                onModify={() => {}}
                count={item.quantity}
              />
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TestCartPage;
