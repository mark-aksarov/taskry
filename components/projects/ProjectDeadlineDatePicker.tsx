import { DateValue } from "react-aria";
import { useTranslations } from "next-intl";
import { ResponsiveDatePicker } from "@/components/common/ResponsiveDatePicker";

interface ProjectDeadlineDatePickerProps {
  defaultValue?: DateValue;
  matchTriggerWidth?: boolean;
}

export function ProjectDeadlineDatePicker({
  defaultValue,
  matchTriggerWidth = true,
}: ProjectDeadlineDatePickerProps) {
  const t = useTranslations("projects.ProjectDeadlineDatePicker");

  return (
    <ResponsiveDatePicker
      data-test="project-deadline-date-picker"
      name="deadline"
      label={t("label")}
      overlayClassName={matchTriggerWidth ? "w-[var(--trigger-width)]" : ""}
      isRequired
      errorMessage={t("validation.required")}
      defaultValue={defaultValue}
    />
  );
}
