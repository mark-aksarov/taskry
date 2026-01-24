import { DateValue } from "react-aria";
import { useTranslations } from "next-intl";
import { today, getLocalTimeZone } from "@internationalized/date";
import { ResponsiveDatePicker } from "@/components/common/ResponsiveDatePicker";

interface TaskFormBaseDeadlineDatePickerProps {
  defaultValue?: DateValue;
}

export function TaskFormBaseDeadlineDatePicker({
  defaultValue,
}: TaskFormBaseDeadlineDatePickerProps) {
  const t = useTranslations("tasks.TaskFormBaseDeadlineDatePicker");

  const now = today(getLocalTimeZone());

  return (
    <ResponsiveDatePicker
      data-test="deadline-date-picker"
      name="deadline"
      label={t("label")}
      overlayClassName="w-[var(--trigger-width)]"
      isRequired
      errorMessage={t("validation.required")}
      defaultValue={defaultValue}
    />
  );
}
