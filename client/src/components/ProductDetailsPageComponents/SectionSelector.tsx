import styles from "./styles.module.css";
import { Section } from "../../pages/ProductDetaillsPage/ProductDetailsPage";

interface Props {
  selectedSection: Section;
  setSelectedSection(section: Section): void;
}

const SectionSelector = ({ selectedSection, setSelectedSection }: Props) => {
  return (
    <ul className={styles.flxBx}>
      <li
        className={`${styles.navSelector} ${
          selectedSection === "about" && styles.selected
        }`}
        onClick={() => {
          setSelectedSection("about");
        }}
      >
        About Product
      </li>
      <li
        className={`${styles.navSelector} ${
          selectedSection === "details" && styles.selected
        }`}
        onClick={() => {
          setSelectedSection("details");
        }}
      >
        Details
      </li>
      <li
        className={`${styles.navSelector} ${
          selectedSection === "specs" && styles.selected
        }`}
        onClick={() => {
          setSelectedSection("specs");
        }}
      >
        Specs
      </li>
    </ul>
  );
};

export default SectionSelector;
