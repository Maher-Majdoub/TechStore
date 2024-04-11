import { Modal } from "@mui/material";
import { LiaTimesSolid } from "react-icons/lia";
import AddEditAddress from "../UserPageComponents/AddEditAddress";
import styles from "./styles.module.css";

const PopupAddressForm = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose(): void;
}) => {
  return (
    <Modal
      onClose={() => {
        onClose();
      }}
      className="scroll"
      sx={{
        margin: "auto",
        overflow: "auto",
        maxWidth: "780px",
        maxHeight: "90%",
      }}
      open={open}
    >
      <div className={styles.popupContainer}>
        <div>
          <div className={styles.exitBtn}>
            <button
              onClick={() => {
                onClose();
              }}
            >
              <LiaTimesSolid />
            </button>
          </div>
          <AddEditAddress onSuccess={onClose} />
        </div>
      </div>
    </Modal>
  );
};

export default PopupAddressForm;
