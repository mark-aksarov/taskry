"use client";

import {
  useTaskFilters,
  useTaskFiltersDispatch,
} from "@/components/tasks/TaskFiltersContext/TaskFiltersContext";

import { useTranslations } from "next-intl";
import { ResponsiveDatePicker } from "@/components/common/ResponsiveDatePicker";

export function TaskFiltersFormDeadlineToDatePicker() {
  const t = useTranslations("tasks.TaskFiltersFormDeadlineToDatePicker");

  const filters = useTaskFilters();
  const dispatch = useTaskFiltersDispatch();

  return (
    <ResponsiveDatePicker
      data-test="deadline-to-date-picker"
      overlayClassName="w-[var(--trigger-width)]"
      label={t("label")}
      value={filters.deadlineTo}
      onChange={(date) => dispatch({ type: "changeDeadlineTo", payload: date })}
      name="deadlineTo"
      minValue={filters.deadlineFrom}
    />
  );
}
