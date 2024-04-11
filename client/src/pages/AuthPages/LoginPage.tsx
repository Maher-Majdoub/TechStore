import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { userAccountEndPoints } from "../../constants";
import useAuthorization from "../../hooks/useAuthorization";
import useRefreshToken from "../../hooks/useRefreshToken";
import Navigator from "../../components/Navigator/Navigator";
import LoginForm from "../../components/AuthComponents/LoginForm";
import NewCustomer from "../../components/AuthComponents/NewCustomer";
import LinksSection from "../../components/LinksSection/LinksSection";
import styles from "./styles.module.css";
import { NextPageContext } from "../../contexts";

const LoginPage = () => {
  const navigate = useNavigate();
  const { refresh, isAccessExpired, isRefreshExpired } = useAuthorization();
  const { refreshToken, isRefreshSuccess, isRefreshPending, isRefreshError } =
    useRefreshToken();

  const { nextPage, resetNextPage } = useContext(NextPageContext);

  useEffect(() => {
    if (!isAccessExpired || isRefreshSuccess) {
      let nxt = nextPage;
      resetNextPage();
      navigate(nxt || userAccountEndPoints["account_dashboard"]);
    }
  }, [isAccessExpired, isRefreshSuccess]);

  useEffect(() => {
    if (refresh && !isRefreshExpired && !isRefreshError && !isRefreshPending) {
      refreshToken({ refresh: refresh });
    }
  }, [refresh, isRefreshExpired, isRefreshError, isRefreshPending]);

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
