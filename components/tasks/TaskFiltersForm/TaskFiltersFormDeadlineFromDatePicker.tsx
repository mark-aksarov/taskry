"use client";

import { TaskFilters } from "@/lib/types";
import { useTranslations } from "next-intl";
import { parseDate } from "@internationalized/date";
import { ResponsiveDatePicker } from "@/components/common/ResponsiveDatePicker";

interface TaskFiltersFormDeadlineFromDatePickerProps {
  filters?: TaskFilters;
}

export function TaskFiltersFormDeadlineFromDatePicker({
  filters,
}: TaskFiltersFormDeadlineFromDatePickerProps) {
  const t = useTranslations("tasks.TaskFiltersFormDeadlineFromDatePicker");

  const defaultValue = filters?.deadlineFrom
    ? parseDate(filters?.deadlineFrom?.toISOString().split("T")[0])
    : undefined;

  return (
    <ResponsiveDatePicker
      data-test="deadline-date-picker"
      label={t("label")}
      defaultValue={defaultValue}
      name="deadlineFrom"
    />
  );
}
