"use client";

import { useTranslations } from "next-intl";
import { Skeleton } from "@/ui/Skeleton";
import { DetailStatSkeleton } from "@/dashboard/common/DetailStat";
import { DetailTitle, DetailInfoAlt } from "@/dashboard/common/Detail";
import { ProjectActiveTasksDetailStat } from "../ProjectActiveTasksDetailStat";
import { ProjectPendingTasksDetailStat } from "../ProjectPendingTasksDetailStat";
import { ProjectCompletedTasksDetailStat } from "../ProjectCompletedTasksDetailStat";

const styles = "flex w-full gap-4 max-md:flex-col";

interface ProjectTasksStatsDetailInfoAltProps {
  tasks: {
    active: number;
    pending: number;
    completed: number;
  };
}

export function ProjectTasksStatsDetailInfoAlt({
  tasks,
}: ProjectTasksStatsDetailInfoAltProps) {
  const t = useTranslations("dashboard.projects.ProjectDetail");

  return (
    <DetailInfoAlt
      title={<DetailTitle>{t("tasksStats")}</DetailTitle>}
      content={
        <div className={styles}>
          <ProjectActiveTasksDetailStat value={tasks.active} />
          <ProjectPendingTasksDetailStat value={tasks.pending} />
          <ProjectCompletedTasksDetailStat value={tasks.completed} />
        </div>
      }
    />
  );
}

export function ProjectTasksStatsDetailInfoAltSkeleton() {
  return (
    <DetailInfoAlt
      title={<Skeleton className="w-[7rem]" size="sm" />}
      content={
        <div className={styles}>
          <DetailStatSkeleton />
          <DetailStatSkeleton />
          <DetailStatSkeleton />
        </div>
      }
    />
  );
}
