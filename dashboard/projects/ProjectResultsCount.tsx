import { useTranslations } from "next-intl";
import { ResultsCount } from "../common/ResultsCount";

export function ProjectResultsCount({ count }: { count: number }) {
  const t = useTranslations("dashboard.projects.ProjectResultsCount");

  return <ResultsCount>{t("projectsFound", { count })}</ResultsCount>;
}
