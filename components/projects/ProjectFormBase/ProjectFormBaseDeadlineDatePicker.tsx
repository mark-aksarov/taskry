import { DateValue } from "react-aria";
import { useTranslations } from "next-intl";
import { today, getLocalTimeZone } from "@internationalized/date";
import { ResponsiveDatePicker } from "@/components/common/ResponsiveDatePicker";

interface ProjectFormBaseDeadlineDatePickerProps {
  defaultValue?: DateValue;
}

export function ProjectFormBaseDeadlineDatePicker({
  defaultValue,
}: ProjectFormBaseDeadlineDatePickerProps) {
  const t = useTranslations("projects.ProjectFormBase.deadline");

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
