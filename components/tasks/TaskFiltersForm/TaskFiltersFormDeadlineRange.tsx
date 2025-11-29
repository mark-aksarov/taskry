import { useTranslations } from "next-intl";
import { ResponsiveDatePicker } from "@/components/common/ResponsiveDatePicker";

export function TaskFiltersFormDeadlineRange() {
  const t = useTranslations(
    "tasks.TaskFiltersForm.TaskFiltersFormDeadlineRange",
  );

  return (
    <div className="flex gap-4">
      <ResponsiveDatePicker className="flex-auto" label={t("label")} />
      <ResponsiveDatePicker
        className="flex-auto self-end"
        aria-label={t("labelTo")}
      />
    </div>
  );
}
