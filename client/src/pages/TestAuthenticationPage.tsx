import { useEffect } from "react";
import useCustomer from "../hooks/useCustomer";
import { useNavigate } from "react-router-dom";

const TestAuthenticationPage = () => {
  const navigate = useNavigate();
  const { customer, isLoading, isError } = useCustomer();

  useEffect(() => {
    if (isError) navigate("/login");
  }, [isError]);

  return (
    <main>
      {isLoading && <p>Loding...</p>}
      <div>
        <h1>{customer?.user.email}</h1>
        <p>yeah we are logged in</p>
      </div>
    </main>
  );
};

export default TestAuthenticationPage;
