import { Link } from "react-router-dom";
import NotFoundImage from "../../assets/404.jpg";
import { endpoints } from "../../constants";
import styles from "./styles.module.css";

const NotFoundPage = () => {
  return (
    <main className={styles.errorContainer}>
      <img src={NotFoundImage} className={styles.errorImage} />
      <p className={styles.text}>
        We can't seem to find a page you're looking for...
      </p>
      <Link to={endpoints["home"]} className={styles.link}>
        {"Go Home >"}
      </Link>
    </main>
  );
};

export default NotFoundPage;
