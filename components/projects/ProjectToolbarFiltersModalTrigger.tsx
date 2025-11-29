import { useTranslations } from "next-intl";
import { ToolbarFiltersModalTrigger } from "@/components/common/Toolbar";

export function ProjectToolbarFiltersModalTrigger({
  filtersForm,
}: {
  filtersForm: React.ReactNode;
}) {
  const t = useTranslations("projects.ProjectToolbarFiltersModalTrigger");

  return (
    <ToolbarFiltersModalTrigger title={t("title")} filtersForm={filtersForm} />
  );
}
