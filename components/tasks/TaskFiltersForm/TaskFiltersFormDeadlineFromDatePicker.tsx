"use client";

import {
  useTaskFilters,
  useTaskFiltersDispatch,
} from "@/components/tasks/TaskFiltersContext/TaskFiltersContext";

import { useTranslations } from "next-intl";
import { ResponsiveDatePicker } from "@/components/common/ResponsiveDatePicker";

export function TaskFiltersFormDeadlineFromDatePicker() {
  const t = useTranslations("tasks.TaskFiltersFormDeadlineFromDatePicker");

  const filters = useTaskFilters();
  const dispatch = useTaskFiltersDispatch();

  return (
    <ResponsiveDatePicker
      data-test="deadline-from-date-picker"
      overlayClassName="w-[var(--trigger-width)]"
      label={t("label")}
      value={filters.deadlineFrom}
      onChange={(date) =>
        dispatch({ type: "changeDeadlineFrom", payload: date })
      }
      name="deadlineFrom"
    />
  );
}
