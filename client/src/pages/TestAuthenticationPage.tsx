import { useEffect } from "react";
import useCustomer from "../hooks/useCustomer";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard/ProductCard";

const TestAuthenticationPage = () => {
  const navigate = useNavigate();
  const { customer, isLoading, isError } = useCustomer();

  useEffect(() => {
    if (isError) navigate("/login");
  }, [isError]);

  return (
    <main>
      {isLoading && <p>Loding...</p>}
      {customer && (
        <>
          <div>
            <h1>{customer.user.email}</h1>
            <p>{customer.user.first_name}</p>
            <p>{customer.user.last_name}</p>
            <p>yeah we are logged in</p>
          </div>
          <div>
            <h1>wishes</h1>
            <ul>
              {customer.wish_list.map((wish) => (
                <ProductCard key={wish.id} product={wish.product} />
              ))}
            </ul>
          </div>
        </>
      )}
    </main>
  );
};

export default TestAuthenticationPage;
