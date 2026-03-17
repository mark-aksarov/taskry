import { useTranslations } from "next-intl";
import { GridItemProgress } from "@/components/common/Grid";

interface TaskGridItemProgressProps {
  subtasksDone: number;
  subtasksTotal: number;
}

export function TaskGridItemProgress({
  subtasksDone,
  subtasksTotal,
}: TaskGridItemProgressProps) {
  const t = useTranslations("tasks.TaskGridItemProgress");

  return (
    <GridItemProgress
      value={(subtasksDone / subtasksTotal) * 100}
      showValueText={false}
      aria-label={t("ariaLabel")}
    />
  );
}
