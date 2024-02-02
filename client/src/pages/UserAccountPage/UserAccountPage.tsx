import styles from "./UserAccountPage.module.css";
import AccountInformation from "../../components/UserPageComponents/AccountInformation";
import AccountDashboard from "../../components/UserPageComponents/AccountDashboard";
import OrdersList from "../../components/UserPageComponents/OrdersList";
import WishList from "../../components/WishList/WishList";
import CompareList from "../../components/CompareList/CompareList";
import Navigator from "../../components/Navigator/Navigator";
import LinksSection from "../../components/LinksSection/LinksSection";
import AddressBook from "../../components/UserPageComponents/AddressBook";
import useLocation from "../../hooks/useLocation";
import { useNavigate } from "react-router-dom";

const UserAccountPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const endpoints = pathname.split("/");
  const endpoint = endpoints[endpoints.length - 1];

  console.log(endpoint);

  return (
    <>
      <main className=" container">
        <Navigator />
        <div className={styles.container}>
          <h1 className={styles.title}>{endpoint.replace("_", " ")}</h1>
          <div className={styles.content}>
            <ul className={styles.sectionSelectors}>
              <li
                className={`${styles.sectionSelector} ${
                  endpoint === "account_dashboard" ? styles.selected : ""
                }`}
                onClick={() => {
                  navigate("/customer/account_dashboard");
                }}
              >
                Account DashBoard
              </li>
              <li
                className={`${styles.sectionSelector} ${
                  endpoint === "account_information" ? styles.selected : ""
                }`}
                onClick={() => {
                  navigate("/customer/account_information");
                }}
              >
                Account Information
              </li>
              <li
                className={`${styles.sectionSelector} ${
                  endpoint === "address_book" ? styles.selected : ""
                }`}
                onClick={() => {
                  navigate("/customer/address_book");
                }}
              >
                Address Book
              </li>
              <li
                className={`${styles.sectionSelector} ${
                  endpoint === "orders" ? styles.selected : ""
                }`}
                onClick={() => {
                  navigate("/customer/orders");
                }}
              >
                My Orders
              </li>
              <li
                className={`${styles.sectionSelector} ${
                  endpoint === "wishlist" ? styles.selected : ""
                }`}
                onClick={() => {
                  navigate("/customer/wishlist");
                }}
              >
                My Wish List
              </li>
              <li
                className={`${styles.sectionSelector} ${
                  endpoint === "compare_products" ? styles.selected : ""
                }`}
                onClick={() => {
                  navigate("/customer/compare_products");
                }}
              >
                Compare Products
              </li>
            </ul>
            <div className={styles.section}>
              {endpoint === "account_dashboard" && (
                <AccountDashboard
                  displayAddressBook={() => {
                    //setSelectedSection(Section.addresses);
                  }}
                />
              )}
              {endpoint === "account_information" && <AccountInformation />}
              {endpoint === "address_book" && <AddressBook />}
              {endpoint === "orders" && <OrdersList />}
              {endpoint === "wishlist" && <WishList />}
              {endpoint === "compare_products" && <CompareList />}
            </div>
          </div>
          <LinksSection />
        </div>
      </main>
    </>
  );
};

export default UserAccountPage;
