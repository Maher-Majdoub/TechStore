import { LiaTimesSolid } from "react-icons/lia";
import styles from "./ActionBtn.module.css";
import { TiPencil } from "react-icons/ti";

interface Props {
  action: "delete" | "modify";
  onClick(): void;
}

const ActionBtn = ({ action, onClick }: Props) => {
  return (
    <button className={styles.btn} onClick={onClick}>
      {action === "delete" ? <LiaTimesSolid /> : <TiPencil />}
    </button>
  );
};

export default ActionBtn;
