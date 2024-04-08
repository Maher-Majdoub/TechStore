import LoginForm from "../../components/AuthComponents/LoginForm";
import SignupForm from "../../components/AuthComponents/SignupForm";
import LinksSection from "../../components/LinksSection/LinksSection";
import Navigator from "../../components/Navigator/Navigator";
import styles from "./styles.module.css";

const SignUpPage = () => {
  return (
    <main>
      <div className={styles.container + " container"}>
        <Navigator />
        <h2 className={styles.title}>Sign UP</h2>
        <div className={styles.sections}>
          <SignupForm />
          <LoginForm />
        </div>
      </div>
      <LinksSection />
    </main>
  );
};

export default SignUpPage;
