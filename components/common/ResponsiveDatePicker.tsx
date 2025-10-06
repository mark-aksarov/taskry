"use client";

import { DateValue } from "react-aria";
import { DatePicker, DatePickerProps } from "@/components/ui";
import { useResponsiveOverlayType } from "@/lib/hooks";

export const ResponsiveDatePicker = <T extends DateValue>(
  props: DatePickerProps<T>,
) => {
  const overlayType = useResponsiveOverlayType();

  return <DatePicker {...props} overlayType={overlayType} />;
};
