import { ReactNode } from "react";
import styles from "./Icon.module.css";

interface Props {
  children: ReactNode;
  onClick(): void;
  count?: number;
}

const Icon = ({ children, onClick, count }: Props) => {
  return (
    <div onClick={onClick} className={styles.container}>
      {children}
      {count !== undefined && <span className={styles.cnt}>{count}</span>}
    </div>
  );
};

export default Icon;
