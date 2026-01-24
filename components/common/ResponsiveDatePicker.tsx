"use client";

import { DateValue } from "react-aria";
import { useResponsiveOverlayType } from "@/lib/hooks";
import { DatePicker, DatePickerProps } from "@/components/ui/DatePicker";

export const ResponsiveDatePicker = <T extends DateValue>(
  props: DatePickerProps<T>,
) => {
  const overlayType = useResponsiveOverlayType();

  return <DatePicker {...props} overlayType={overlayType} />;
};
