import { GridItemProgress } from "@/dashboard/common/GridItem";
import { useTranslations } from "next-intl";

interface ProjectGridItemProgressProps {
  tasksTotal: number;
  tasksCompleted: number;
}

export function ProjectGridItemProgress({
  tasksTotal,
  tasksCompleted,
}: ProjectGridItemProgressProps) {
  const t = useTranslations("dashboard.projects.ProjectGridItemProgress");

  return (
    <GridItemProgress
      value={(tasksCompleted / tasksTotal) * 100}
      showValueText={false}
      aria-label={t("progressAriaLabel")}
    />
  );
}
