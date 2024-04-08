import { ReactNode } from "react";
import styles from "./Button.module.css";
import { CircularProgress } from "@mui/material";

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
      disabled={load}
      className={`${styles.container} ${
        filled ? styles.filled : styles.hollow
      }`}
      onClick={onClick}
    >
      {load && (
        <div className={styles.loader}>
          <CircularProgress color="inherit" size={25} />
        </div>
      )}
      <div className={load ? styles.hidden : ""}>{children}</div>
    </button>
  );
};

export default Button;
