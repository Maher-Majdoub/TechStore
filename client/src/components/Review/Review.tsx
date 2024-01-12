import { FaStar } from "react-icons/fa";
import styles from "./Review.module.css";

interface Props {
  rate: number;
  total: number;
}

const Review = ({ rate, total }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.stars}>
        {Array.from({ length: rate }, () => (
          <div className={styles.checked}>
            <FaStar />
          </div>
        ))}
        {Array.from({ length: 5 - rate }, () => (
          <div className={styles.unchecked}>
            <FaStar />
          </div>
        ))}
      </div>
      <span>Reviews {`(${total})`}</span>
    </div>
  );
};

export default Review;
