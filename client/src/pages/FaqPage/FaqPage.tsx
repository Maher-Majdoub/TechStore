import LinksSection from "../../components/LinksSection/LinksSection";
import Navigator from "../../components/Navigator/Navigator";
import styles from "./FaqPage.module.css";

const FaqPage = () => {
  return (
    <main>
      <div className={styles.container + " container"}>
        <Navigator />
        <div className={styles.content}>
          <div className={styles.head}>
            <h1 className={styles.title}>FAQ</h1>
            <p className={styles.subTitle}>
              Can't find the answer you're looking for? We've shared some of our
              most frequently asked questions to you out!
            </p>
          </div>
          <div className={styles.questions}>
            <div className={styles.question}>
              <span className={styles.questionTitle}>
                1. What payment methods do you accept?
              </span>
              <p className={styles.questionContent}>
                We accept various payment methods including credit/debit cards
                (Visa, MasterCard...) PayPal, and bank transfers. Please note
                that available payment options may vary based on your location.
              </p>
            </div>
            <div className={styles.question}>
              <span className={styles.questionTitle}>
                2. How do I track my order?
              </span>
              <span className={styles.questionContent}>
                Once your order has been processed and shipped, you will receive
                a confirmation email with a tracking number and instructions on
                how to track your package. You can also track your order
                directly from our website by logging into your account and
                accessing the order status page.
              </span>
            </div>
            <div className={styles.question}>
              <span className={styles.questionTitle}>
                3. What is your return policy?
              </span>
              <span className={styles.questionContent}>
                We offer a hassle-free return policy within [number] days of
                receiving your order. Items must be unused, in their original
                packaging, and accompanied by proof of purchase. Please refer to
                our Returns & Exchanges page for more information on our return
                process.
              </span>
            </div>
            <div className={styles.question}>
              <span className={styles.questionTitle}>
                4. Can I cancel or modify my order after it has been placed?
              </span>
              <span className={styles.questionContent}>
                Orders can be cancelled or modified within [number] hours of
                placing the order. Please contact our customer service team as
                soon as possible to request any changes to your order.
              </span>
            </div>
            <div className={styles.question}>
              <span className={styles.questionTitle}>
                5. Do you ship internationally?
              </span>
              <span className={styles.questionContent}>
                Yes, we offer international shipping to most countries. Shipping
                costs and delivery times may vary depending on your location.
                You can check if we ship to your country and view shipping rates
                during the checkout process.
              </span>
            </div>
            <div className={styles.question}>
              <span className={styles.questionTitle}>
                6. How do I contact customer support?
              </span>
              <span className={styles.questionContent}>
                Our customer support team is available to assist you with any
                questions or concerns you may have. You can reach us via email
                at support@techstore.com, or through our contact form on the
                website. We strive to respond to all inquiries within 24 hours.
              </span>
            </div>
            <div className={styles.question}>
              <span className={styles.questionTitle}>
                7. Are my personal and payment details secure on your website?
              </span>
              <span className={styles.questionContent}>
                Yes, we take the security and privacy of your information
                seriously. Our website uses industry-standard encryption
                technology to protect your personal and payment details during
                transmission. Additionally, we do not store any sensitive
                payment information on our servers.
              </span>
            </div>
            <div className={styles.question}>
              <span className={styles.questionTitle}>
                8. Do you offer gift wrapping services?
              </span>
              <span className={styles.questionContent}>
                Yes, we offer gift wrapping services for an additional fee.
                During the checkout process, you can select the option to have
                your items gift wrapped and include a personalized message.
              </span>
            </div>
            <div className={styles.question}>
              <span className={styles.questionTitle}>
                9. How can I stay updated on new products and promotions?
              </span>
              <span className={styles.questionContent}>
                To stay updated on new product launches, promotions, and
                exclusive offers, you can subscribe to our newsletter. Simply
                enter your email address in the subscription box located at the
                bottom of our website.
              </span>
            </div>
            <div className={styles.question}>
              <span className={styles.questionTitle}>
                10. Can I place an order over the phone?
              </span>
              <span className={styles.questionContent}>
                At this time, we only accept orders placed through our website.
                If you need assistance with placing an order online, please
                contact our customer support team, and we'll be happy to help
                you through the process.
              </span>
            </div>
          </div>
        </div>
      </div>
      <LinksSection />
    </main>
  );
};

export default FaqPage;
