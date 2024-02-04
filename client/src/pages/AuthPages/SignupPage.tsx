import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/AuthComponents/LoginForm";
import SignupForm from "../../components/AuthComponents/SignupForm";
import LinksSection from "../../components/LinksSection/LinksSection";
import Navigator from "../../components/Navigator/Navigator";
import useSignup from "../../hooks/useSinup";
import styles from "./styles.module.css";
import { endpoints } from "../../constants";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signup, isSignupSuccess, isSignupError } = useSignup();

  if (isSignupError) window.alert("signup failed");
  if (isSignupSuccess) {
    console.log("signed up");
    navigate(endpoints["login"]);
  }

  return (
    <main className={styles.container + " container"}>
      <Navigator />
      <h2 className={styles.title}>Sign UP</h2>
      <div className={styles.sections}>
        <SignupForm
          onSignup={(email, username, password) => {
            signup({ email: email, username: username, password: password });
          }}
        />
        <LoginForm onLogin={() => {}} />
      </div>
      <LinksSection />
    </main>
  );
};

export default SignUpPage;
