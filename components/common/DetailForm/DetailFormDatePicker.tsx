import { DateValue } from "react-aria";
import { DatePickerProps } from "@/components/ui";
import { ResponsiveDatePicker } from "../ResponsiveDatePicker";

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
