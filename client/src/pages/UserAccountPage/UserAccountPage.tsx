import styles from "./UserAccountPage.module.css";
import Navigator from "../../components/Navigator/Navigator";
import LinksSection from "../../components/LinksSection/LinksSection";
import useLocation from "../../hooks/useLocation";
import { useNavigate } from "react-router-dom";
import { endpoints, screenWidths, userAccountEndPoints } from "../../constants";
import useAuthorization from "../../hooks/useAuthorization";
import SectionSelector from "./SectionSelector";
import Section from "./Section";
import { useWindowSize } from "@uidotdev/usehooks";
import { useContext, useEffect, useState } from "react";
import { Address } from "../../hooks/useCustomer";
import { AddressToEditContext, NextPageContext } from "../../contexts";
import { toast } from "react-toastify";

const UserAccountPage = () => {
  const { pathname } = useLocation();
  const currEndpoints = pathname.split("/");
  const endpoint = currEndpoints[currEndpoints.length - 1];

  const { width } = useWindowSize();
  const { isAccessExpired, isRefreshExpired } = useAuthorization();

  const [addressToEdit, setAddressToEdit] = useState<Address | undefined>(
    undefined
  );

  const navigate = useNavigate();
  const { setNextPage } = useContext(NextPageContext);

  useEffect(() => {
    if (isAccessExpired && isRefreshExpired) {
      toast.warn("Please login first");
      setNextPage(
        endpoint === "wishlist"
          ? userAccountEndPoints["wishlist"]
          : userAccountEndPoints["account_dashboard"]
      );
      navigate(endpoints["login"]);
    }
  }, []);

  return (
    <AddressToEditContext.Provider
      value={{
        address: addressToEdit as Address,
        setAddress: (address) => {
          setAddressToEdit(address);
        },
      }}
    >
      <main className={styles.container}>
        <div className="container">
          <Navigator />
          <div>
            {width && width > screenWidths["tablets"] && (
              <h1 className={styles.title}>{endpoint.replace("_", " ")}</h1>
            )}
            <div className={styles.content}>
              <SectionSelector currEndpoint={endpoint} />
              <Section endpoint={endpoint} />
            </div>
          </div>
        </div>
        <LinksSection />
      </main>
    </AddressToEditContext.Provider>
  );
};

export default UserAccountPage;
