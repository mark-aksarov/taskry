import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
} from "@/dashboard/common/Detail";

import { isPast } from "date-fns";
import { useTranslations } from "next-intl";
import { ProjectStatus } from "@/generated/prisma/enums";
import { OverdueBadge } from "@/dashboard/common/OverdueBadge";
import { ProjectDetailAltLayout } from "./ProjectDetailAltLayout";
import { ProjectTitleDetailInfoAlt } from "./ProjectTitleDetailInfoAlt";
import { ProjectStatusDetailInfoAlt } from "./ProjectStatusDetailInfoAlt";
import { ProjectClientDetailInfoAlt } from "./ProjectClientDetailInfoAlt";
import { ProjectCategoryDetailInfoAlt } from "./ProjectCategoryDetailInfoAlt";
import { ProjectDeadlineDetailInfoAlt } from "./ProjectDeadlineDetailInfoAlt";
import { ProgressDetailInfoAlt } from "@/dashboard/common/ProgressDetailInfoAlt";
import { ProjectTasksStatsDetailInfoAlt } from "./ProjectTasksStatsDetailInfoAlt";
import { ProjectDescriptionDetailInfoAlt } from "./ProjectDescriptionDetailInfoAlt";

interface ProjectDetailAltProps {
  title: string;
  creator?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };
  deadline: string;
  description?: string;
  client?: {
    id: number;
    fullName: string;
    imageUrl?: string;
  };
  category?: {
    id: number;
    name: string;
  };
  status: ProjectStatus;
  tasks: {
    total: number;
    active: number;
    pending: number;
    completed: number;
  };
}

export function ProjectDetailAlt({
  title,
  creator,
  deadline,
  description,
  client,
  category,
  status,
  tasks,
}: ProjectDetailAltProps) {
  const t = useTranslations("dashboard.projects.ProjectDetail");

  const deadlineDate = new Date(deadline);

  return (
    <ProjectDetailAltLayout
      overdueSlot={
        isPast(deadlineDate) && (
          <OverdueBadge deadline={deadlineDate} className="w-fit" />
        )
      }
      titleSlot={<ProjectTitleDetailInfoAlt title={title} />}
      descriptionSlot={
        <ProjectDescriptionDetailInfoAlt description={description} />
      }
      statusSlot={<ProjectStatusDetailInfoAlt status={status} />}
      deadlineSlot={<ProjectDeadlineDetailInfoAlt deadline={deadlineDate} />}
      clientSlot={<ProjectClientDetailInfoAlt client={client} />}
      categorySlot={<ProjectCategoryDetailInfoAlt category={category} />}
      creatorSlot={
        <DetailInfoAlt
          className="border-none pb-0"
          title={<DetailTitle>{t("creator")}</DetailTitle>}
          content={
            creator ? (
              <DetailText>{creator.fullName}</DetailText>
            ) : (
              <DetailText>{t("noCreator")}</DetailText>
            )
          }
          surface
        />
      }
      progressSlot={
        <ProgressDetailInfoAlt
          aria-label={t("progress")}
          progress={tasks.total ? (tasks.completed / tasks.total) * 100 : 0}
        />
      }
      tasksStatsSlot={<ProjectTasksStatsDetailInfoAlt tasks={tasks} />}
    />
  );
}
