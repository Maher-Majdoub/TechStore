import MiniProductCard from "../components/MiniProductCard/MiniProductCard";
import useCart from "../hooks/useCart";

const TestCartPage = () => {
  const { cart, isLoading, isError, deleteFromCart } = useCart();
  if (isError) {
    return <h1>Something Went Wrong!</h1>;
  }

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
                onDelete={() => {
                  deleteFromCart({ itemId: item.id });
                }}
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
