"use client";

import { useTranslations } from "next-intl";
import { CalendarDate } from "@internationalized/date";
import { ResponsiveDatePicker } from "@/dashboard/common/ResponsiveDatePicker";

interface DeadlineFromDatePickerProps {
  value: CalendarDate | null;
  onChange: (value: CalendarDate | null) => void;
}

export function DeadlineFromDatePicker({
  value,
  onChange,
}: DeadlineFromDatePickerProps) {
  const t = useTranslations("dashboard.tasks.DeadlineFromDatePicker");

  return (
    <ResponsiveDatePicker
      data-test="deadline-from-date-picker"
      overlayClassName="w-[var(--trigger-width)]"
      label={t("label")}
      value={value}
      onChange={onChange}
      name="deadlineFrom"
    />
  );
}
