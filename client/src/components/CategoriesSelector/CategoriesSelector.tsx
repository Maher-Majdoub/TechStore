import { useWindowSize } from "@uidotdev/usehooks";
import { screenWidths } from "../../constants";
import DesktopCategorySelector from "./DesktopCategorySelector";
import MobileCategorySelector from "./MobileCategorySelector";

const CategoriesSelector = () => {
  const { width } = useWindowSize();

  return (
    <>
      {width && width > screenWidths["tablets"] ? (
        <DesktopCategorySelector />
      ) : (
        <MobileCategorySelector />
      )}
    </>
  );
};

export default CategoriesSelector;
