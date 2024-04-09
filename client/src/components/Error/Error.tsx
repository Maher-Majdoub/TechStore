import { Link } from "react-router-dom";
import SorryImage from "../../assets/sorry.jpg";
import styles from "./Error.module.css";
import { endpoints } from "../../constants";

interface Props {
  title?: string;
  content?: string;
  goHome?: boolean;
}

const Error = ({ title, content, goHome = false }: Props) => {
  return (
    <div className={styles.errorContainer}>
      <img src={SorryImage} className={styles.errorImage} />
      <span className={styles.errorTitle}>{title}</span>
      <span className={styles.errorContent}>{content}</span>
      {goHome && (
        <Link to={endpoints["home"]} className={styles.link}>
          {"Go Home >"}
        </Link>
      )}
    </div>
  );
};

export default Error;
