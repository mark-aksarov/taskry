import { useTranslations } from "next-intl";
import { ResponsiveDatePicker } from "@/components/common/ResponsiveDatePicker";

export function ProjectFiltersFormDeadlineRange() {
  const t = useTranslations(
    "projects.ProjectFiltersForm.ProjectFiltersFormDeadlineRange",
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
