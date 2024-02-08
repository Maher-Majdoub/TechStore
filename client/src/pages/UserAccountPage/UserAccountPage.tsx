import styles from "./UserAccountPage.module.css";
import Navigator from "../../components/Navigator/Navigator";
import LinksSection from "../../components/LinksSection/LinksSection";
import useLocation from "../../hooks/useLocation";
import { Navigate } from "react-router-dom";
import { endpoints, screenWidths } from "../../constants";
import useAuthorization from "../../hooks/useAuthorization";
import SectionSelector from "./SectionSelector";
import Section from "./Section";
import { useWindowSize } from "@uidotdev/usehooks";

const UserAccountPage = () => {
  const { pathname } = useLocation();
  const currEndpoints = pathname.split("/");
  const endpoint = currEndpoints[currEndpoints.length - 1];

  const { width } = useWindowSize();
  const { isAccessExpired, isRefreshExpired } = useAuthorization();

  if (isAccessExpired && isRefreshExpired)
    return <Navigate to={endpoints["login"]} />;

  return (
    <>
      <main>
        <div className="container">
          <Navigator />
          <div className={styles.container}>
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
    </>
  );
};

export default UserAccountPage;
