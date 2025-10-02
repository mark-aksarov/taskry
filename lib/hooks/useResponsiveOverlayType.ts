import { useMediaQuery } from "react-responsive";

export const useResponsiveOverlayType = () => {
  const isMd = useMediaQuery({ query: "(max-width: 48rem)" });

  return isMd ? "bottomsheet" : "popover";
};
