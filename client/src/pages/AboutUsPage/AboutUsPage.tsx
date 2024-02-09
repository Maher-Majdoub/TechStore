import LinksSection from "../../components/LinksSection/LinksSection";
import styles from "./AboutUsPage.module.css";
import Navigator from "../../components/Navigator/Navigator";
import aboutUs1 from "../../assets/aboutUs1.jpg";
import aboutUs2 from "../../assets/aboutUs2.png";
import aboutUs3 from "../../assets/aboutUs3.jpg";
import aboutUs4 from "../../assets/aboutUs4.png";
import aboutUs5 from "../../assets/aboutUs5.jpg";
import { useWindowSize } from "@uidotdev/usehooks";
import { screenWidths } from "../../constants";

const AboutUsPage = () => {
  const { width } = useWindowSize();

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <div className="container">
          <Navigator />
          <h1 className={styles.title}>About Us</h1>
        </div>
        <div>
          <section className={`${styles.section} ${styles.dark}`}>
            {width && width <= screenWidths["tablets"] && (
              <div className={styles.imgContainer}>
                <img src={aboutUs1} className={styles.img} />
              </div>
            )}
            <div className={styles.sectionContent}>
              <h1 className={styles.sectionTitle}>
                A Family That Keeps On Growing
              </h1>
              <p>
                We always aim to please the home market, supplying great
                computers and hardware at great prices to non-corporate
                customers, through our large Melbourne CBD showroom and our
                online store.
              </p>
              <p>
                Shop management approach fosters a strong customer service focus
                in our staff. We prefer to cultivate long-term client
                relationships rather than achieve quick sales, demonstrated in
                the measure of our long-term success.
              </p>
            </div>
            {width && width > screenWidths["tablets"] && (
              <div className={styles.imgContainer}>
                <img src={aboutUs1} className={styles.img} />
              </div>
            )}
          </section>
          <section className={`${styles.section}`}>
            <div className={styles.imgContainer}>
              <img src={aboutUs2} className={styles.img} />
            </div>
            <div className={styles.sectionContent}>
              <h1 className={styles.sectionTitle}>TechStore.com</h1>
              <p>
                At TechStore, we embark on a journey through the digital realm,
                offering you a curated selection of cutting-edge technology and
                gadgets. Dive into a world where innovation meets style, and
                discover a treasure trove of tech wonders designed to elevate
                your lifestyle.
              </p>
            </div>
          </section>
          <section className={`${styles.section} ${styles.dark}`}>
            {width && width <= screenWidths["tablets"] && (
              <div className={styles.imgContainer}>
                <img src={aboutUs3} className={styles.img} />
              </div>
            )}
            <div className={styles.sectionContent}>
              <h1 className={styles.sectionTitle}>
                The Highest Quality of Products
              </h1>
              <p>
                We guarantee the highest quality of the products we sell.
                Several decades of successful operation and millions of happy
                customers let us feel certain about that. Besides, all items we
                sell pass thorough quality control, so no characteristics
                mismatch can escape the eye of our professionals.
              </p>
            </div>
            {width && width > screenWidths["tablets"] && (
              <div className={styles.imgContainer}>
                <img src={aboutUs3} className={styles.img} />
              </div>
            )}
          </section>
          <section className={`${styles.section}`}>
            <div className={styles.imgContainer}>
              <img src={aboutUs4} className={styles.img} />
            </div>
            <div className={styles.sectionContent}>
              <h1 className={styles.sectionTitle}>We Deliver to Any Region</h1>
              <p>
                We deliver our goods all across Tunisa. No matter where you
                live, your order will be shipped in time and delivered right to
                your door or to any other location you have stated. The packages
                are handled with utmost care, so the ordered products will be
                handed to you safe and sound, just like you expect them to be.
              </p>
            </div>
          </section>
          <section className={`${styles.section} ${styles.dark}`}>
            {width && width <= screenWidths["tablets"] && (
              <div className={styles.imgContainer}>
                <img src={aboutUs5} className={styles.img} />
              </div>
            )}
            <div className={styles.sectionContent}>
              <h1 className={styles.sectionTitle}>Now You're In Safe Hands</h1>
              <p>
                We guarantee the highest quality of the products we sell.
                Several decades of successful operation and millions of happy
                customers let us feel certain about that. Besides, all items we
                sell pass thorough quality control, so no characteristics
                mismatch can escape the eye of our professionals.
              </p>
            </div>
            {width && width > screenWidths["tablets"] && (
              <div className={styles.imgContainer}>
                <img src={aboutUs5} className={styles.img} />
              </div>
            )}
          </section>
        </div>
      </div>
      <LinksSection />
    </main>
  );
};

export default AboutUsPage;
