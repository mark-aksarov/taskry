"use client";

import { ProjectFilters } from "@/lib/types";
import { useTranslations } from "next-intl";
import { parseDate } from "@internationalized/date";
import { ResponsiveDatePicker } from "@/components/common/ResponsiveDatePicker";

interface ProjectFiltersFormDeadlineToDatePickerProps {
  filters?: ProjectFilters;
}

export function ProjectFiltersFormDeadlineToDatePicker({
  filters,
}: ProjectFiltersFormDeadlineToDatePickerProps) {
  const t = useTranslations("projects.ProjectFiltersFormDeadlineToDatePicker");

  const defaultValue = filters?.deadlineTo
    ? parseDate(filters?.deadlineTo?.toISOString().split("T")[0])
    : undefined;

  return (
    <ResponsiveDatePicker
      data-test="deadline-to-date-picker"
      label={t("label")}
      defaultValue={defaultValue}
      name="deadlineTo"
    />
  );
}
