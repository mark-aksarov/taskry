import { useTranslations } from "next-intl";
import { today, getLocalTimeZone } from "@internationalized/date";
import { ResponsiveDatePicker } from "@/components/common/ResponsiveDatePicker";

export function NewProjectFormDeadlineDatePicker() {
  const t = useTranslations(
    "projects.NewProjectForm.NewProjectFormDeadlineDatePicker",
  );

  const now = today(getLocalTimeZone());

  return (
    <ResponsiveDatePicker
      name="deadline"
      label={t("label")}
      overlayClassName="w-[var(--trigger-width)]"
      isRequired
      minValue={now}
      errorMessage={t("validation.required")}
    />
  );
}
