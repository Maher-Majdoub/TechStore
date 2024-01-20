import { ReactNode } from "react";
import styles from "./Button.module.css";

interface Props {
  children: ReactNode;
  filled?: boolean;
  onClick?(): void;
}

const Button = ({ children, filled = false, onClick = () => {} }: Props) => {
  return (
    <button
      className={filled ? styles.filled : styles.hollow}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
