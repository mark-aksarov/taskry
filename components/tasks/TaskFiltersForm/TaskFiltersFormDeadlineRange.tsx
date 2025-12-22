import { DateValue } from "react-aria";
import { useTranslations } from "next-intl";
import { ResponsiveDatePicker } from "@/components/common/ResponsiveDatePicker";

interface RangeProps {
  startDate: DateValue | null;
  endDate: DateValue | null;
  onDateChange: (val: any, type: "start" | "end") => void;
  isDisabled: boolean;
}

export function TaskFiltersFormDeadlineRange({
  startDate,
  endDate,
  onDateChange,
  isDisabled,
}: RangeProps) {
  const t = useTranslations(
    "tasks.TaskFiltersForm.TaskFiltersFormDeadlineRange",
  );

  return (
    <div
      className={`flex gap-4 transition-opacity ${isDisabled ? "pointer-events-none opacity-40" : ""}`}
    >
      <ResponsiveDatePicker
        className="flex-auto"
        label={t("label")}
        value={startDate}
        onChange={(val) => onDateChange(val, "start")}
      />
      <ResponsiveDatePicker
        className="flex-auto self-end"
        aria-label={t("labelTo")}
        value={endDate}
        onChange={(val) => onDateChange(val, "end")}
      />
    </div>
  );
}
