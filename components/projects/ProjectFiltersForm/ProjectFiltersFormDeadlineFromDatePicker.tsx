"use client";

import { useTranslations } from "next-intl";
import { CalendarDate } from "@internationalized/date";
import { ResponsiveDatePicker } from "@/components/common/ResponsiveDatePicker";

interface ProjectFiltersFormDeadlineFromDatePickerProps {
  deadlineFrom: CalendarDate | null;
  setDeadlineFrom: (date: CalendarDate | null) => void;
}

export function ProjectFiltersFormDeadlineFromDatePicker({
  deadlineFrom,
  setDeadlineFrom,
}: ProjectFiltersFormDeadlineFromDatePickerProps) {
  const t = useTranslations(
    "projects.ProjectFiltersFormDeadlineFromDatePicker",
  );

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
