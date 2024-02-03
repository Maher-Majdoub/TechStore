import { LiaTimesSolid } from "react-icons/lia";
import styles from "./ActionBtn.module.css";
import { TiPencil } from "react-icons/ti";
import { FaBalanceScale, FaRegHeart } from "react-icons/fa";

interface Props {
  action: "delete" | "modify" | "addToWish" | "addToCompare";
  onClick(): void;
}

const ActionBtn = ({ action, onClick }: Props) => {
  return (
    <button
      className={styles.btn}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
    >
      {action === "delete" && <LiaTimesSolid />}
      {action === "modify" && <TiPencil />}
      {action === "addToWish" && <FaRegHeart />}
      {action === "addToCompare" && <FaBalanceScale />}
    </button>
  );
};

export default ActionBtn;
