"use client";

import { MenuTrigger, MenuTriggerProps } from "../ui/Menu";
import { useResponsiveOverlayType } from "@/lib/hooks/useResponsiveOverlayType";

export const ResponsiveMenuTrigger = <T extends object = any>(
  props: MenuTriggerProps<T>,
) => {
  const overlayType = useResponsiveOverlayType();

  return <MenuTrigger {...props} overlayType={overlayType} />;
};
