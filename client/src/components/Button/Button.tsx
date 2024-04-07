import { ReactNode } from "react";
import styles from "./Button.module.css";
import Loader from "../Loader/Loader";

interface Props {
  children: ReactNode;
  filled?: boolean;
  load?: boolean;
  onClick?(): void;
}

const Button = ({
  children,
  filled = false,
  load = false,
  onClick = () => {},
}: Props) => {
  return (
    <button
      className={`${styles.container} ${
        filled ? styles.filled : styles.hollow
      }`}
      onClick={onClick}
    >
      {load && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}
      <div className={load ? styles.hidden : ""}>{children}</div>
    </button>
  );
};

export default Button;
