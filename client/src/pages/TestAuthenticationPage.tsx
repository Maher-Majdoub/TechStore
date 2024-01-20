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
    </main>
  );
};

export default TestAuthenticationPage;
