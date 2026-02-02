import { useMediaQuery } from "react-responsive";

export const useResponsiveOverlayType = () => {
  const isMd = useMediaQuery({ query: "(max-width: 47.999rem)" });

  return isMd ? "bottomsheet" : "popover";
};
