import styles from "./UserAccountPage.module.css";
import { useState } from "react";
import AccountInformation from "../../components/UserPageComponents/AccountInformation";
import AccountDashboard from "../../components/UserPageComponents/AccountDashboard";
import Ordres from "../../components/UserPageComponents/Ordres";
import WishList from "../../components/WishList/WishList";
import CompareList from "../../components/CompareList/CompareList";
import Navigator from "../../components/Navigator/Navigator";
import LinksSection from "../../components/LinksSection/LinksSection";
import AddressBook from "../../components/UserPageComponents/AddressBook";

enum Section {
  dashBoard = "My Dashboard",
  info = "Account Information",
  addresses = "Address Book",
  orders = "My Orders",
  wishList = "My Wish List",
  compareList = "Compare Products",
}

const UserAccountPage = () => {
  const [selectedSection, setSelectedSection] = useState(Section.dashBoard);

  return (
    <>
      <main className=" container">
        <Navigator />
        <div className={styles.container}>
          <h1 className={styles.title}>{selectedSection}</h1>
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
              {selectedSection === Section.dashBoard && (
                <AccountDashboard
                  displayAddressBook={() => {
                    setSelectedSection(Section.addresses);
                  }}
                />
              )}
              {selectedSection === Section.info && <AccountInformation />}
              {selectedSection === Section.addresses && <AddressBook />}
              {selectedSection === Section.orders && <Ordres />}
              {selectedSection === Section.wishList && <WishList />}
              {selectedSection === Section.compareList && <CompareList />}
            </div>
          </div>
          <LinksSection />
        </div>
      </main>
    </>
  );
};

export default UserAccountPage;
