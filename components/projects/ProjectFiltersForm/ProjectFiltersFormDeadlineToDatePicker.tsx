"use client";

import {
  useProjectFilters,
  useProjectFiltersDispatch,
} from "../ProjectFiltersContext";

import { useTranslations } from "next-intl";
import { ResponsiveDatePicker } from "@/components/common/ResponsiveDatePicker";

export function ProjectFiltersFormDeadlineToDatePicker() {
  const t = useTranslations("projects.ProjectFiltersFormDeadlineToDatePicker");

  const filters = useProjectFilters();
  const dispatch = useProjectFiltersDispatch();

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
