"use client";

import { useTranslations } from "next-intl";
import { useDeadlineFromDatePicker } from "../DeadlineFromDatePicker";
import { useDeadlineToDatePicker } from "./DeadlineToDatePickerContext";
import { ResponsiveDatePicker } from "@/components/common/ResponsiveDatePicker";

export function DeadlineToDatePicker() {
  const t = useTranslations("tasks.DeadlineToDatePicker");

  const { value, updateValue } = useDeadlineToDatePicker();
  const { value: deadlineFromValue } = useDeadlineFromDatePicker();

  return (
    <ResponsiveDatePicker
      data-test="deadline-to-date-picker"
      overlayClassName="w-[var(--trigger-width)]"
      label={t("label")}
      value={value}
      onChange={updateValue}
      name="deadlineTo"
      minValue={deadlineFromValue}
    />
  );
}
