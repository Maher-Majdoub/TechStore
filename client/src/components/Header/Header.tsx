import { screenWidths } from "../../constants";
import { useWindowSize } from "@uidotdev/usehooks";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

const Header = () => {
  const { width } = useWindowSize();

  return (
    <>
      {width && width > screenWidths["tablets"] ? (
        <DesktopHeader />
      ) : (
        <MobileHeader />
      )}
    </>
  );
};

export default Header;
