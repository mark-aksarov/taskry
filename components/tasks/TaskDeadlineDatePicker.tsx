import { DateValue } from "react-aria";
import { useTranslations } from "next-intl";
import { ResponsiveDatePicker } from "@/components/common/ResponsiveDatePicker";

interface TaskDeadlineDatePickerProps {
  defaultValue?: DateValue;
}

export function TaskDeadlineDatePicker({
  defaultValue,
}: TaskDeadlineDatePickerProps) {
  const t = useTranslations("tasks.TaskDeadlineDatePicker");

  return (
    <ResponsiveDatePicker
      data-test="task-deadline-date-picker"
      name="deadline"
      label={t("label")}
      overlayClassName="w-[var(--trigger-width)]"
      isRequired
      errorMessage={t("validation.required")}
      defaultValue={defaultValue}
    />
  );
}
