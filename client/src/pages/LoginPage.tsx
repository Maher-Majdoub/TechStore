import { useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import { useEffect, useRef } from "react";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  var logged = false;
  const navigate = useNavigate();
  const { login, data, isError } = useLogin();
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  if (!isError && data) {
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    logged = true;
  }

  useEffect(() => {
    if (logged) navigate("/customer");
  }, [logged]);

  return (
    <main>
      <nav>Home {">"} Login</nav>
      <h2>Customer Login</h2>
      <div>
        <h5>Registered Customers</h5>
        <span>If you have an account, sign in with your credentials.</span>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div>
            <span>User Name</span>
            <input
              ref={username}
              type="text"
              placeholder="Your User Name"
              required
            />
          </div>
          <div>
            <span>Password</span>
            <input
              ref={password}
              type="password"
              placeholder="Your Password"
              required
            />
          </div>
          <div>
            <Button
              onClick={() => {
                if (username.current?.value && password.current?.value) {
                  login({
                    username: username.current.value,
                    password: password.current.value,
                  });
                }
              }}
              filled
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
      <div>
        <h5>New Customer?</h5>
        <span>Creating an account has many benefits:</span>
        <ul>
          <li>Check out faster</li>
          <li>Exclusive offers and discounts</li>
          <li>Save order history</li>
          <li>Track orders and more</li>
        </ul>
        <Button
          onClick={() => {
            navigate("/signup");
          }}
          filled
        >
          Create An Account
        </Button>
      </div>
    </main>
  );
};

export default LoginPage;
