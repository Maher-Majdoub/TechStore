import { IoLocationOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import styles from "./StoreInfos.module.css";

const StoreInfos = () => {
  return (
    <div className={styles.container}>
      <div className={styles.element}>
        <span className={styles.icon}>
          <IoLocationOutline />
        </span>
        <div className={styles.desc}>
          <span>Address:</span>
          <p>1234 Street Address City Address, 1234</p>
        </div>
      </div>
      <div className={styles.element}>
        <span className={styles.icon}>
          <FiPhone />
        </span>
        <div className={styles.desc}>
          <span>Phone:</span>
          <p>{"(+261) 20 202 020"}</p>
        </div>
      </div>
      <div className={styles.element}>
        <span className={styles.icon}>
          <FaRegClock />
        </span>
        <div className={styles.desc}>
          <span>We are open:</span>
          <p>Monday - Thursday: 9:00 AM - 5:30 PM</p>
          <p>Friday 9:00 AM - 6:00 PM</p>
          <p>Saturday: 11:00 AM - 5:00 PM</p>
        </div>
      </div>
      <div className={styles.element}>
        <span className={styles.icon}>
          <MdMailOutline />
        </span>
        <div className={styles.desc}>
          <span>E-Mail:</span>
          <a href="mailto:techstore@email.com">techstore@email.com</a>
        </div>
      </div>
    </div>
  );
};

export default StoreInfos;
