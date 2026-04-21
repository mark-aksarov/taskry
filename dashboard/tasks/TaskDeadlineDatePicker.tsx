import { DateValue } from "react-aria";
import { useTranslations } from "next-intl";
import { ResponsiveDatePicker } from "@/common/ResponsiveDatePicker";

interface TaskDeadlineDatePickerProps {
  defaultValue?: DateValue;
  matchTriggerWidth?: boolean;
}

export function TaskDeadlineDatePicker({
  defaultValue,
  matchTriggerWidth = true,
}: TaskDeadlineDatePickerProps) {
  const t = useTranslations("dashboard.tasks.TaskDeadlineDatePicker");

  return (
    <ResponsiveDatePicker
      data-test="task-deadline-date-picker"
      name="deadline"
      label={t("label")}
      overlayClassName={matchTriggerWidth ? "w-[var(--trigger-width)]" : ""}
      isRequired
      errorMessage={t("validation.required")}
      defaultValue={defaultValue}
    />
  );
}
