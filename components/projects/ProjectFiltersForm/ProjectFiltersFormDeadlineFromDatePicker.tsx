"use client";

import {
  useProjectFilters,
  useProjectFiltersDispatch,
} from "../ProjectFiltersContext";

import { useTranslations } from "next-intl";
import { ResponsiveDatePicker } from "@/components/common/ResponsiveDatePicker";

export function ProjectFiltersFormDeadlineFromDatePicker() {
  const t = useTranslations(
    "projects.ProjectFiltersFormDeadlineFromDatePicker",
  );

  const filters = useProjectFilters();
  const dispatch = useProjectFiltersDispatch();

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
