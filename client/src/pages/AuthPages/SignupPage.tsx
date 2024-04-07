import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/AuthComponents/LoginForm";
import SignupForm from "../../components/AuthComponents/SignupForm";
import LinksSection from "../../components/LinksSection/LinksSection";
import Navigator from "../../components/Navigator/Navigator";
import useSignup from "../../hooks/useSignup";
import styles from "./styles.module.css";
import { endpoints } from "../../constants";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signup, isSignupSuccess } = useSignup();

  if (isSignupSuccess) {
    navigate(endpoints["login"]);
  }

  return (
    <main>
      <div className={styles.container + " container"}>
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
      </div>
      <LinksSection />
    </main>
  );
};

export default SignUpPage;
