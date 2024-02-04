import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useJwt } from "react-jwt";
import { endpoints } from "../../constants";
import useLogin from "../../hooks/useLogin";
import Navigator from "../../components/Navigator/Navigator";
import LoginForm from "../../components/AuthComponents/LoginForm";
import NewCustomer from "../../components/AuthComponents/NewCustomer";
import styles from "./styles.module.css";
import LinksSection from "../../components/LinksSection/LinksSection";

const LoginPage = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    const { isExpired } = useJwt(accessToken);
    if (!isExpired) {
      useEffect(() => {
        navigate(endpoints["accountDashboard"]);
      }, []);
    }
  }

  const { login, data, isError } = useLogin();

  if (!isError && data) {
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    navigate(endpoints["accountDashboard"]);
    return;
  }

  return (
    <main className={styles.container + " container"}>
      <Navigator />
      <h2 className={styles.title}>Customer Login</h2>
      {(!data || isError) && (
        <div className={styles.sections}>
          <LoginForm
            onLogin={(username, password) => {
              login({ username: username, password: password });
            }}
          />
          <NewCustomer />
        </div>
      )}
      <LinksSection />
    </main>
  );
};

export default LoginPage;
