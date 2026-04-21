"use client";

import { useTranslations } from "next-intl";
import { CalendarDate } from "@internationalized/date";
import { ResponsiveDatePicker } from "@/common/ResponsiveDatePicker";

interface DeadlineToDatePickerProps {
  value: CalendarDate | null;
  deadlineFromValue: CalendarDate | null;
  onChange: (value: CalendarDate | null) => void;
}

export function DeadlineToDatePicker({
  value,
  deadlineFromValue,
  onChange,
}: DeadlineToDatePickerProps) {
  const t = useTranslations("dashboard.tasks.DeadlineToDatePicker");

  return (
    <ResponsiveDatePicker
      data-test="deadline-to-date-picker"
      overlayClassName="w-[var(--trigger-width)]"
      label={t("label")}
      value={value}
      onChange={onChange}
      name="deadlineTo"
      minValue={deadlineFromValue}
    />
  );
}
