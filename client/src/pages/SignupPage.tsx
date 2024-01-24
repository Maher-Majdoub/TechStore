import Button from "../components/Button/Button";
import Navigator from "../components/Navigator/Navigator";

const SignUpPage = () => {
  return (
    <main>
      <Navigator />
      <h2>Create An Account</h2>
      <div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            console.log("login");
          }}
        >
          <h5>Personal informations</h5>
          <div>
            <span>First Name </span>
            <input type="text" placeholder="Enter Your First Name" required />
          </div>
          <div>
            <span>Last Name </span>
            <input type="text" placeholder="Enter Your Last Name" required />
          </div>
          <div>
            <span>Email </span>
            <input type="email" placeholder="Enter Your Email" required />
          </div>
          <div>
            <span>Password </span>
            <input type="password" placeholder="Enter Your Password" required />
          </div>
          <div>
            <span>Confirm Password </span>
            <input
              type="password"
              placeholder="Reenter Your Password"
              required
            />
          </div>
          <Button filled>Signup</Button>
        </form>
      </div>
    </main>
  );
};

export default SignUpPage;
