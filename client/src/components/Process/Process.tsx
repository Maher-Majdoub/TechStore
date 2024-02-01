import { MdOutlineDone } from "react-icons/md";
import styles from "./Process.module.css";

interface Props {
  name: string;
  count?: number;
  done?: boolean;
}

const Process = ({ name, count, done }: Props) => {
  return (
    <div className={`${styles.container} ${done && styles.done}`}>
      <div className={styles.statusContainer}>
        <div className={styles.line}></div>
        <div className={styles.status}>
          {count && <span>{count}</span>}
          {done && <MdOutlineDone />}
        </div>
        <div className={styles.line}></div>
      </div>
      <span className={styles.name}>{name}</span>
    </div>
  );
};

export default Process;
