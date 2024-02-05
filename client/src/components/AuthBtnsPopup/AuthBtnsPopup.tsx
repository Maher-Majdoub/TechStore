import { useNavigate } from "react-router-dom";
import useAuthorization from "../../hooks/useAuthorization";
import useLogout from "../../hooks/useLogout";
import { endpoints } from "../../constants";
import styles from "./AuthBtnPopup.module.css";

interface Props {
  onSelect(): void;
}

const AuthBtnsPopup = ({ onSelect }: Props) => {
  const { isAccessExpired, isRefreshExpired } = useAuthorization();
  const navigate = useNavigate();
  const { logout } = useLogout();

  return (
    <div className={styles.container}>
      <div className={styles.btns}>
        {isAccessExpired && isRefreshExpired ? (
          <>
            <button
              onClick={() => {
                onSelect();
                navigate(endpoints["login"]);
              }}
            >
              Login
            </button>
            <button
              onClick={() => {
                onSelect();
                navigate(endpoints["signup"]);
              }}
            >
              SignUp
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                onSelect();
                navigate(endpoints["accountDashboard"]);
              }}
            >
              View Account
            </button>
            <button
              onClick={() => {
                onSelect();
                logout();
                navigate(endpoints["homePage"]);
              }}
            >
              logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthBtnsPopup;
