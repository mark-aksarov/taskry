"use client";

import { Select, SelectProps } from "@/components/ui/Select";
import { useResponsiveOverlayType } from "@/lib/hooks/useResponsiveOverlayType";

export const ResponsiveSelect = <T extends object = any>(
  props: SelectProps<T>,
) => {
  const overlayType = useResponsiveOverlayType();

  return <Select {...props} overlayType={overlayType} />;
};
