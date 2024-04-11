import { userAccountEndPoints } from "../../constants";
import { screenWidths } from "../../constants";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";
import { useState } from "react";
import styles from "./UserAccountPage.module.css";

const SectionSelector = ({ currEndpoint }: { currEndpoint: string }) => {
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const [viewList, setViewList] = useState(false);

  return (
    <>
      {width && width > screenWidths["tablets"] ? (
        <ul className={styles.sectionSelectors}>
          <li
            className={`${styles.sectionSelector} ${
              currEndpoint === "account_dashboard" && styles.selected
            }`}
            onClick={() => {
              navigate(userAccountEndPoints["account_dashboard"]);
            }}
          >
            Account Dashboard
          </li>
          <li
            className={`${styles.sectionSelector} ${
              currEndpoint === "account_information" && styles.selected
            }`}
            onClick={() => {
              navigate(userAccountEndPoints["account_information"]);
            }}
          >
            Account Information
          </li>
          <li
            className={`${styles.sectionSelector} ${
              (currEndpoint === "address_book" ||
                currEndpoint === "add_address" ||
                currEndpoint === "edit_address") &&
              styles.selected
            }`}
            onClick={() => {
              navigate(userAccountEndPoints["address_book"]);
            }}
          >
            Address Book
          </li>
          <li
            className={`${styles.sectionSelector} ${
              currEndpoint === "orders" && styles.selected
            }`}
            onClick={() => {
              navigate(userAccountEndPoints["orders"]);
            }}
          >
            My Orders
          </li>
          <li
            className={`${styles.sectionSelector} ${
              currEndpoint === "wishlist" && styles.selected
            }`}
            onClick={() => {
              navigate(userAccountEndPoints["wishlist"]);
            }}
          >
            Wishlist
          </li>
        </ul>
      ) : (
        <div className={styles.mobileSectionSelector}>
          <div
            className={styles.currSection}
            onClick={() => {
              setViewList(!viewList);
            }}
          >
            <span>{currEndpoint.replace("_", " ")}</span>
            {viewList ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {viewList && (
            <ul>
              {Object.entries(userAccountEndPoints).map(
                ([endpoint, url], index) => (
                  <li
                    key={index}
                    className={`${styles.sectionSelector} ${
                      currEndpoint === endpoint && styles.selected
                    }`}
                    onClick={() => {
                      setViewList(false);
                      navigate(url);
                    }}
                  >
                    {endpoint.replace("_", " ")}
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default SectionSelector;
