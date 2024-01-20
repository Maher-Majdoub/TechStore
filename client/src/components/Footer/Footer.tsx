import Button from "../Button/Button";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer
      className={styles.footer}
      onSubmit={(event) => {
        event.preventDefault();
        console.log("subscribe");
      }}
    >
      <div className={styles.newsLister + " container"}>
        <div className={styles.title}>
          <h2>Sign Up To Our Newslteller.</h2>
          <p>Be the first to hear about the latest offers.</p>
        </div>
        <form className={styles.frm}>
          <input
            type="text"
            placeholder="Your Email"
            className={styles.input}
          />
          <Button filled>Subscribe</Button>
        </form>
      </div>
      <div className={styles.copyright + " container"}>
        <p>Copyright &copy; 2024-present TechStore, Inc. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
