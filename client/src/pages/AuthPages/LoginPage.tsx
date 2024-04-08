import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userAccountEndPoints } from "../../constants";
import useAuthorization from "../../hooks/useAuthorization";
import useRefreshToken from "../../hooks/useRefreshToken";
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

  useEffect(() => {
    if (!isAccessExpired || isRefreshSuccess) {
      navigate(userAccountEndPoints["account_dashboard"]);
    }
  }, [isAccessExpired, isRefreshSuccess]);

  useEffect(() => {
    if (refresh && !isRefreshExpired && !isRefreshError && !isRefreshPending) {
      refreshToken({ refresh: refresh });
    }
  }, [refresh, isRefreshExpired, isRefreshError, isRefreshPending]);

  if (isRefreshPending) return <p>Wait....</p>;

  return (
    <main>
      <div className={styles.container + " container"}>
        <Navigator />
        <h2 className={styles.title}>Customer Login</h2>
        <div className={styles.sections}>
          <LoginForm />
          <NewCustomer />
        </div>
      </div>
      <LinksSection />
    </main>
  );
};

export default LoginPage;
