import { useTranslations } from "next-intl";
import { ResultsCount } from "../common/ResultsCount";

export function TaskResultsCount({ count }: { count: number }) {
  const t = useTranslations("tasks.TaskResultsCount");

  return <ResultsCount>{t("tasksFound", { count })}</ResultsCount>;
}
