import { useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import styles from "./Navigator.module.css";
import useLocation from "../../hooks/useLocation";
import { endpoints } from "../../constants";

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

  const currEndpoints = pathname.split("/");
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <span
        className={styles.endpoint}
        onClick={() => {
          navigate(endpoints["home"]);
        }}
      >
        Home
      </span>
      {currEndpoints.map((value, index) => {
        return (
          <div key={index}>
            <FaChevronRight />
            {index === currEndpoints.length - 1 ? (
              <span className={`${styles.currEndpoint} ${styles.endpoint}`}>
                {value.replace("-", " ")}
              </span>
            ) : (
              <span
                className={styles.endpoint}
                onClick={() => {
                  navigate(getNavEndpoint(value, currEndpoints));
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
