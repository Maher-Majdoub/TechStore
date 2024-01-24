import styles from "./UserAccountPage.module.css";
import { useState } from "react";
import AccountInformation from "../../components/AccountInformation/AccountInformation";
import AccountDashboard from "../../components/AccountDashboard/AccountDashboard";
import Addresses from "../../components/Addresses/Addresses";
import Ordres from "../../components/Orders/Ordres";
import WishList from "../../components/WishList/WishList";
import CompareList from "../../components/CompareList/CompareList";
import Navigator from "../../components/Navigator/Navigator";

enum Section {
  dashBoard,
  info,
  addresses,
  orders,
  wishList,
  compareList,
}

const UserAccountPage = () => {
  const [selectedSection, setSelectedSection] = useState(Section.info);

  return (
    <>
      <main className={styles.container + " container"}>
        <Navigator />
        <h1 className={styles.title}>My Dashboard</h1>
        <div className={styles.content}>
          <ul className={styles.sectionSelectors}>
            <li
              className={`${styles.sectionSelector} ${
                selectedSection === Section.dashBoard ? styles.selected : ""
              }`}
              onClick={() => {
                setSelectedSection(Section.dashBoard);
              }}
            >
              Account DashBoard
            </li>
            <li
              className={`${styles.sectionSelector} ${
                selectedSection === Section.info ? styles.selected : ""
              }`}
              onClick={() => {
                setSelectedSection(Section.info);
              }}
            >
              Account Information
            </li>
            <li
              className={`${styles.sectionSelector} ${
                selectedSection === Section.addresses ? styles.selected : ""
              }`}
              onClick={() => {
                setSelectedSection(Section.addresses);
              }}
            >
              Address Book
            </li>
            <li
              className={`${styles.sectionSelector} ${
                selectedSection === Section.orders ? styles.selected : ""
              }`}
              onClick={() => {
                setSelectedSection(Section.orders);
              }}
            >
              My Orders
            </li>
            <li
              className={`${styles.sectionSelector} ${
                selectedSection === Section.wishList ? styles.selected : ""
              }`}
              onClick={() => {
                setSelectedSection(Section.wishList);
              }}
            >
              My Wish List
            </li>
            <li
              className={`${styles.sectionSelector} ${
                selectedSection === Section.compareList ? styles.selected : ""
              }`}
              onClick={() => {
                setSelectedSection(Section.compareList);
              }}
            >
              Compare Products
            </li>
          </ul>
          <div className={styles.section}>
            {selectedSection === Section.dashBoard && <AccountDashboard />}
            {selectedSection === Section.info && <AccountInformation />}
            {selectedSection === Section.addresses && <Addresses />}
            {selectedSection === Section.orders && <Ordres />}
            {selectedSection === Section.wishList && <WishList />}
            {selectedSection === Section.compareList && <CompareList />}
          </div>
        </div>
      </main>
    </>
  );
};

export default UserAccountPage;
