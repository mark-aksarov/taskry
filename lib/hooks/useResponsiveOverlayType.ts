import { useIsMd } from "@/lib/hooks/useIsMd";

export const useResponsiveOverlayType = () => {
  const isMd = useIsMd();

  return isMd ? "bottomsheet" : "popover";
};
