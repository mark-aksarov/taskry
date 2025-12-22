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
  const t = useTranslations("tasks.TaskFormBase.deadline");

  const now = today(getLocalTimeZone());

  return (
    <ResponsiveDatePicker
      name="deadline"
      label={t("label")}
      overlayClassName="w-[var(--trigger-width)]"
      isRequired
      minValue={now}
      errorMessage={t("validation.required")}
      defaultValue={defaultValue}
    />
  );
}
