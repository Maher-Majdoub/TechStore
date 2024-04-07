import styles from "./Loader.module.css";

interface Props {
  width?: number;
  height?: number;
}

const Loader = ({ width = 30, height = 30 }: Props) => {
  return (
    <div
      style={{ width: width, height: height }}
      className={styles.loader}
    ></div>
  );
};

export default Loader;
