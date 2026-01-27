"use client";

import { TaskFilters } from "@/lib/types";
import { useTranslations } from "next-intl";
import { parseDate } from "@internationalized/date";
import { ResponsiveDatePicker } from "@/components/common/ResponsiveDatePicker";

interface TaskFiltersFormDeadlineToDatePickerProps {
  filters?: TaskFilters;
}

export function TaskFiltersFormDeadlineToDatePicker({
  filters,
}: TaskFiltersFormDeadlineToDatePickerProps) {
  const t = useTranslations("tasks.TaskFiltersFormDeadlineToDatePicker");

  const defaultValue = filters?.deadlineTo
    ? parseDate(filters?.deadlineTo?.toISOString().split("T")[0])
    : undefined;

  return (
    <ResponsiveDatePicker
      data-test="deadline-date-picker"
      label={t("label")}
      defaultValue={defaultValue}
      name="deadlineTo"
    />
  );
}
