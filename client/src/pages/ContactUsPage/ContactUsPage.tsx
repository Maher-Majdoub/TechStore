import Button from "../../components/Button/Button";
import LinksSection from "../../components/LinksSection/LinksSection";
import Navigator from "../../components/Navigator/Navigator";
import StoreInfos from "../../components/StoreInfos/StoreInfos";
import styles from "./ContactUsPage.module.css";

const ContactUsPage = () => {
  const handleSubmit = () => {};

  return (
    <main className={styles.container}>
      <div className={styles.mainContent + " container"}>
        <Navigator />
        <h1 className={styles.title}>Contact Us</h1>
        <div>
          <p>We love hearing from you, our Shop customers.</p>
          <p>
            Please contact us and we will make sure to get back to you as soon
            as we possibly can.
          </p>
        </div>
        <div className={styles.flxBx}>
          <form
            className={styles.form}
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit();
            }}
          >
            <div className={styles.inputGroup}>
              <span className={styles.required}>Your Name</span>
              <input
                type="text"
                placeholder="Your Name"
                className={styles.input}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <span className={styles.required}>Your Email</span>
              <input
                type="email"
                placeholder="You Email"
                className={styles.input}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <span>Your Phone Number</span>
              <input type="tel" placeholder="" className={styles.input} />
            </div>
            <div className={styles.inputGroup}>
              <span className={styles.required}>What's on your mind?</span>
              <textarea
                className={styles.input}
                placeholder="Jot us a note and we’ll get back to you as quickly as possible"
              />
            </div>
            <div className={styles.btnContainer}>
              <Button filled>Submit</Button>
            </div>
          </form>
          <StoreInfos />
        </div>
      </div>
      <LinksSection />
    </main>
  );
};

export default ContactUsPage;
