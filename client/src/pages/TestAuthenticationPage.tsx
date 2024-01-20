import ProductCard from "../components/ProductCard/ProductCard";
import useCustomer from "../hooks/useCustomer";

const TestAuthenticationPage = () => {
  const { customer, isLoading, error } = useCustomer();
  return (
    <main>
      <div>
        {error && <p>An error occurred while fetching customer.</p>}
        {isLoading && <p>Loading...</p>}
        {customer && <p>{customer.id}</p>}
      </div>
      <div>
        <ul>
          {customer?.wish_list.map((wish) => (
            <ProductCard key={wish.id} product={wish.product} />
          ))}
        </ul>
      </div>
    </main>
  );
};

export default TestAuthenticationPage;
