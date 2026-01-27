"use client";

import { ProjectFilters } from "@/lib/types";
import { useTranslations } from "next-intl";
import { parseDate } from "@internationalized/date";
import { ResponsiveDatePicker } from "@/components/common/ResponsiveDatePicker";

interface ProjectFiltersFormDeadlineFromDatePickerProps {
  filters?: ProjectFilters;
}

export function ProjectFiltersFormDeadlineFromDatePicker({
  filters,
}: ProjectFiltersFormDeadlineFromDatePickerProps) {
  const t = useTranslations(
    "projects.ProjectFiltersFormDeadlineFromDatePicker",
  );

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
