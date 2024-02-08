import { LiaTimesSolid } from "react-icons/lia";
import styles from "./ActionBtn.module.css";
import { TiPencil } from "react-icons/ti";
import { FaRegEye, FaRegHeart } from "react-icons/fa";

interface Props {
  action: "delete" | "modify" | "addToWish" | "view";
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
      {action === "view" && <FaRegEye />}
    </button>
  );
};

export default ActionBtn;
