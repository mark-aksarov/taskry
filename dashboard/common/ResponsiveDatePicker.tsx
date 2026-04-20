"use client";

import { DateValue } from "react-aria";
import { DatePicker, DatePickerProps } from "@/ui/DatePicker";
import { useResponsiveOverlayType } from "@/lib/hooks/useResponsiveOverlayType";

export const ResponsiveDatePicker = <T extends DateValue>(
  props: DatePickerProps<T>,
) => {
  const overlayType = useResponsiveOverlayType();

  return <DatePicker {...props} overlayType={overlayType} />;
};
