import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useJwt } from "react-jwt";
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
  const { access, refresh } = useAuthorization();
  const { refreshToken, isRefreshSuccess, isRefreshPending, isRefreshError } =
    useRefreshToken();
  const { login, isLoginSuccess, isLoginPending } = useLogin();

  useEffect(() => {
    if (isRefreshSuccess || isLoginSuccess) {
      navigate(endpoints["accountDashboard"]);
    }
    return;
  }, [isRefreshSuccess, isLoginSuccess]);

  const { isExpired: isAccessExpired } = useJwt(access || "");

  useEffect(() => {
    if (access && !isAccessExpired) {
      navigate(endpoints["accountDashboard"]);
      return;
    }
  }, [access, isAccessExpired]);

  const { isExpired: isRefreshExpired } = useJwt(refresh || "");

  if (refresh && !isRefreshError && !isRefreshPending && !isRefreshExpired) {
    refreshToken({ refresh: refresh });
  }

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
