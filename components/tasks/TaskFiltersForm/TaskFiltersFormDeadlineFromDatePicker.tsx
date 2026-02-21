"use client";

import { useTranslations } from "next-intl";
import { CalendarDate } from "@internationalized/date";
import { ResponsiveDatePicker } from "@/components/common/ResponsiveDatePicker";

interface TaskFiltersFormDeadlineFromDatePickerProps {
  deadlineFrom: CalendarDate | null;
  setDeadlineFrom: (date: CalendarDate | null) => void;
}

export function TaskFiltersFormDeadlineFromDatePicker({
  deadlineFrom,
  setDeadlineFrom,
}: TaskFiltersFormDeadlineFromDatePickerProps) {
  const t = useTranslations("tasks.TaskFiltersFormDeadlineFromDatePicker");

  return (
    <ResponsiveDatePicker
      data-test="deadline-from-date-picker"
      label={t("label")}
      value={deadlineFrom}
      onChange={setDeadlineFrom}
      name="deadlineFrom"
    />
  );
}
