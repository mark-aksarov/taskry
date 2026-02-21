"use client";

import { TaskFilters } from "@/lib/types";
import { useTranslations } from "next-intl";
import { CalendarDate, parseDate } from "@internationalized/date";
import { ResponsiveDatePicker } from "@/components/common/ResponsiveDatePicker";

interface TaskFiltersFormDeadlineToDatePickerProps {
  filters?: TaskFilters;
  deadlineFrom: CalendarDate | null;
}

export function TaskFiltersFormDeadlineToDatePicker({
  filters,
}: TaskFiltersFormDeadlineToDatePickerProps) {
  const t = useTranslations("tasks.TaskFiltersFormDeadlineToDatePicker");

  // parse deadlineTo to CalendarDate without time components
  const deadlineTo = filters?.deadlineTo;
  const defaultValue = deadlineTo ? parseDate(deadlineTo) : null;

  return (
    <ResponsiveDatePicker
      data-test="deadline-to-date-picker"
      label={t("label")}
      defaultValue={defaultValue}
      name="deadlineTo"
    />
  );
}
