"use client";

import { useTranslations } from "next-intl";
import { ResponsiveDatePicker } from "@/components/common/ResponsiveDatePicker";
import { useDeadlineFromDatePicker } from "./DeadlineFromDatePickerContext";

export function DeadlineFromDatePicker() {
  const t = useTranslations("tasks.DeadlineFromDatePicker");

  const { value, updateValue } = useDeadlineFromDatePicker();

  return (
    <ResponsiveDatePicker
      data-test="deadline-from-date-picker"
      overlayClassName="w-[var(--trigger-width)]"
      label={t("label")}
      value={value}
      onChange={updateValue}
      name="deadlineFrom"
    />
  );
}
