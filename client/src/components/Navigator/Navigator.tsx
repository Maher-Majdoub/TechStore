import { useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import styles from "./Navigator.module.css";
import useLocation from "../../hooks/useLocation";

const getNavEndpoint = (value: string, endpoints: string[]) => {
  let navEndpoint = "";
  for (const endpoint of endpoints) {
    navEndpoint += `/${endpoint}`;
    if (endpoint === value) break;
  }
  return navEndpoint || "/";
};

const Navigator = () => {
  const { pathname } = useLocation();

  const endpoints = pathname.split("/");
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <span
        className={styles.endpoint}
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </span>
      {endpoints.map((value, index) => {
        return (
          <div key={index}>
            <FaChevronRight />
            {index === endpoints.length - 1 ? (
              <span className={`${styles.currEndpoint} ${styles.endpoint}`}>
                {value.replace("-", " ")}
              </span>
            ) : (
              <span
                className={styles.endpoint}
                onClick={() => {
                  navigate(getNavEndpoint(value, endpoints));
                }}
              >
                {value.replace("-", " ")}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Navigator;
