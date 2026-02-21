"use client";

import { useTranslations } from "next-intl";
import { ProjectFilters } from "@/lib/types";
import { parseDate } from "@internationalized/date";
import { type CalendarDate } from "@internationalized/date";
import { ResponsiveDatePicker } from "@/components/common/ResponsiveDatePicker";

interface ProjectFiltersFormDeadlineToDatePickerProps {
  filters?: ProjectFilters;
  deadlineFrom: CalendarDate | null;
}

export function ProjectFiltersFormDeadlineToDatePicker({
  filters,
  deadlineFrom,
}: ProjectFiltersFormDeadlineToDatePickerProps) {
  const t = useTranslations("projects.ProjectFiltersFormDeadlineToDatePicker");

  // parse deadlineTo to CalendarDate without time components
  const deadlineTo = filters?.deadlineTo;
  const defaultValue = deadlineTo ? parseDate(deadlineTo) : null;

  return (
    <ResponsiveDatePicker
      data-test="deadline-to-date-picker"
      label={t("label")}
      defaultValue={defaultValue}
      name="deadlineTo"
      minValue={deadlineFrom}
    />
  );
}
