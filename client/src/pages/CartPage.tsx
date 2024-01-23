import { useNavigate } from "react-router-dom";
import CartItemsList from "../components/CartItemsList/CartItemsList";
import useCart from "../hooks/useCart";

const TestCartPage = () => {
  const { cart, isLoading, isError } = useCart();
  const navigate = useNavigate();

  if (isError) {
    return <h1>Something Went Wrong!</h1>;
  }

  return (
    <main className="container">
      {isLoading && <p>isLoading...</p>}
      {cart && (
        <>
          <div>
            <p>Home {">"} Shoppint Cart</p>
          </div>
          <div>
            <h2>Shopping Cart</h2>
            <div>
              <CartItemsList />
            </div>
            <div>
              <div>
                <button
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Continue Shopping
                </button>
                <button>Clear Shopping Cart</button>
              </div>
              <button>Update Shopping Cart</button>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default TestCartPage;
