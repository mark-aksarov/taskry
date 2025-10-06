"use client";

import { MenuTrigger, MenuTriggerProps } from "@/components/ui/Menu";
import { useResponsiveOverlayType } from "@/lib/hooks";

export const ResponsiveMenuTrigger = <T extends object = any>(
  props: MenuTriggerProps<T>,
) => {
  const overlayType = useResponsiveOverlayType();

  return <MenuTrigger {...props} overlayType={overlayType} />;
};
