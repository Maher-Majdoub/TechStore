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
          {Object.entries(userAccountEndPoints).map(
            ([endpoint, url], index) => (
              <li
                key={index}
                className={`${styles.sectionSelector} ${
                  currEndpoint === endpoint && styles.selected
                }`}
                onClick={() => {
                  navigate(url);
                }}
              >
                {endpoint.replace("_", " ")}
              </li>
            )
          )}
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
