import Button from "../components/Button/Button";

const LoginPage = () => {
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
            console.log("login");
          }}
        >
          <div>
            <span>User Name</span>
            <input type="text" placeholder="Your User Name" />
          </div>
          <div>
            <span>Password</span>
            <input type="password" placeholder="Your Password" />
          </div>
          <div>
            <Button filled>Sign In</Button>
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
        <Button filled>Create An Account</Button>
      </div>
    </main>
  );
};

export default LoginPage;
