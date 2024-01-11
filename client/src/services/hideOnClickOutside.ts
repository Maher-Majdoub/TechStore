import { RefObject, useEffect } from "react";

interface Props {
  ref: RefObject<HTMLElement>;
  toggleShow(val: boolean): void;
}

const hideOnClickOutSide = ({ ref, toggleShow }: Props) => {
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      toggleShow(false);
    }
  };
};

export default hideOnClickOutSide;
