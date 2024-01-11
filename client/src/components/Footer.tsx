import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="flx-bx">
        <div>
          <h2>Sign Up To Our Newslteller.</h2>
          <p>Be the first to hear about the latest offers.</p>
        </div>
        <form className="flx-bx">
          <input type="text" placeholder="Your Email" />
          <button>Subscribe</button>
        </form>
      </div>
      <div>
        <p>Copyright &copy; 2024-present TechStore, Inc. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
