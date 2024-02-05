import { useRef, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import hideOnClickOutSide from "../../services/hideOnClickOutside";
import Icon from "../Icon/Icon";
import styles from "./styles.module.css";
import AuthBtnsPopup from "../AuthBtnsPopup/AuthBtnsPopup";

const AccountButton = () => {
  const [showPopup, toggleShowPopup] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  hideOnClickOutSide({
    ref: cartRef,
    toggleShow: toggleShowPopup,
  });

  return (
    <div className={styles.container}>
      <Icon
        onClick={() => {
          toggleShowPopup(!showPopup);
        }}
      >
        <FaRegUserCircle fontWeight={100} />
      </Icon>
      <div className={`${styles.popup} ${!showPopup && styles.hiden}`}>
        <AuthBtnsPopup onSelect={() => toggleShowPopup(false)} />
      </div>
    </div>
  );
};

export default AccountButton;
