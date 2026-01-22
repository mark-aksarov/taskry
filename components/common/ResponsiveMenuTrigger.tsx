"use client";

import { MenuTrigger, MenuTriggerProps } from "@/components/ui/Menu";
import { useResponsiveOverlayType } from "@/lib/hooks";

export type ResponsiveMenuTriggerProps<T extends object = any> = Omit<
  MenuTriggerProps<T>,
  "overlayType"
>;

export const ResponsiveMenuTrigger = <T extends object = any>(
  props: ResponsiveMenuTriggerProps<T>,
) => {
  const overlayType = useResponsiveOverlayType();

  return <MenuTrigger {...props} overlayType={overlayType} />;
};
