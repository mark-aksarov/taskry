import { DateValue } from "react-aria";
import { ResponsiveDatePicker } from "../ResponsiveDatePicker";
import { DatePickerProps } from "@/components/ui";

export function DetailFormDatePicker<T extends DateValue>(
  props: DatePickerProps<T>,
) {
  return (
    <ResponsiveDatePicker
      className="flex-row items-center"
      inputClassName="py-3"
      {...props}
    />
  );
}
