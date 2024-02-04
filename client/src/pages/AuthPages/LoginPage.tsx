import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { endpoints } from "../../constants";
import useAuthorization from "../../hooks/useAuthorization";
import useRefreshToken from "../../hooks/useRefreshToken";
import useLogin from "../../hooks/useLogin";
import Navigator from "../../components/Navigator/Navigator";
import LoginForm from "../../components/AuthComponents/LoginForm";
import NewCustomer from "../../components/AuthComponents/NewCustomer";
import LinksSection from "../../components/LinksSection/LinksSection";
import styles from "./styles.module.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { refresh, isAccessExpired, isRefreshExpired } = useAuthorization();
  const { refreshToken, isRefreshSuccess, isRefreshPending, isRefreshError } =
    useRefreshToken();
  const { login, isLoginSuccess, isLoginPending } = useLogin();

  useEffect(() => {
    if (!isAccessExpired || isRefreshSuccess || isLoginSuccess) {
      navigate(endpoints["accountDashboard"]);
    }
  }, [isAccessExpired, isRefreshSuccess, isLoginSuccess]);

  useEffect(() => {
    if (refresh && !isRefreshExpired && !isRefreshError && !isRefreshPending) {
      console.log("refreshing...");
      refreshToken({ refresh: refresh });
    }
  }, [refresh, isRefreshExpired, isRefreshError, isRefreshPending]);

  if (isRefreshPending || isLoginPending) return <p>Wait....</p>;

  return (
    <main className={styles.container + " container"}>
      <Navigator />
      <h2 className={styles.title}>Customer Login</h2>
      <div className={styles.sections}>
        <LoginForm
          onLogin={(username, password) => {
            login({ username: username, password: password });
          }}
        />
        <NewCustomer />
      </div>
      <LinksSection />
    </main>
  );
};

export default LoginPage;
