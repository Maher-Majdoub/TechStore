import CompareList from "../../components/CompareList/CompareList";
import AccountDashboard from "../../components/UserPageComponents/AccountDashboard";
import AccountInformation from "../../components/UserPageComponents/AccountInformation";
import AddressBook from "../../components/UserPageComponents/AddressBook";
import OrdersList from "../../components/UserPageComponents/OrdersList";
import WishList from "../../components/UserPageComponents/WishList";
import styles from "./UserAccountPage.module.css";

const Section = ({ endpoint }: { endpoint: string }) => {
  return (
    <div className={styles.section}>
      {endpoint === "account_dashboard" && <AccountDashboard />}
      {endpoint === "account_information" && <AccountInformation />}
      {endpoint === "address_book" && <AddressBook />}
      {endpoint === "orders" && <OrdersList />}
      {endpoint === "wishlist" && <WishList />}
      {endpoint === "compare_products" && <CompareList />}
    </div>
  );
};

export default Section;
