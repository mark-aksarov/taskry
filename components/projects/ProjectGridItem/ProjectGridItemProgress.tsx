import { GridItemProgress } from "@/components/common/Grid";
import { useTranslations } from "next-intl";

interface ProjectGridItemProgressProps {
  tasksTotal: number;
  tasksCompleted: number;
}

export function ProjectGridItemProgress({
  tasksTotal,
  tasksCompleted,
}: ProjectGridItemProgressProps) {
  const t = useTranslations("projects.ProjectGridItemProgress");

  return (
    <GridItemProgress
      value={(tasksCompleted / tasksTotal) * 100}
      showValueText={false}
      aria-label={t("progressAriaLabel")}
    />
  );
}
