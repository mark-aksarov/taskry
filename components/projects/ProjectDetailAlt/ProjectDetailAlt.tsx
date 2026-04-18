import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
} from "@/components/common/Detail";

import { useTranslations } from "next-intl";
import { ProjectStatus } from "@/generated/prisma/enums";
import { ProjectDetailAltLayout } from "./ProjectDetailAltLayout";
import { ProjectTitleDetailInfoAlt } from "./ProjectTitleDetailInfoAlt";
import { ProjectStatusDetailInfoAlt } from "./ProjectStatusDetailInfoAlt";
import { ProjectCategoryDetailInfoAlt } from "./ProjectCategoryDetailInfoAlt";
import { ProjectDeadlineDetailInfoAlt } from "./ProjectDeadlineDetailInfoAlt";
import { ProjectCustomerDetailInfoAlt } from "./ProjectCustomerDetailInfoAlt";
import { ProgressDetailInfoAlt } from "@/components/common/ProgressDetailInfoAlt";
import { ProjectDescriptionDetailInfoAlt } from "./ProjectDescriptionDetailInfoAlt";
import { ProjectTasksStatsDetailInfoAlt } from "./ProjectTasksStatsDetailInfoAlt";

interface ProjectDetailAltProps {
  title: string;
  creator?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };
  deadline: string;
  description?: string;
  customer?: {
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
  customer,
  category,
  status,
  tasks,
}: ProjectDetailAltProps) {
  const t = useTranslations("projects.ProjectDetail");

  return (
    <ProjectDetailAltLayout
      titleSlot={<ProjectTitleDetailInfoAlt title={title} />}
      descriptionSlot={
        <ProjectDescriptionDetailInfoAlt description={description} />
      }
      statusSlot={<ProjectStatusDetailInfoAlt status={status} />}
      deadlineSlot={<ProjectDeadlineDetailInfoAlt deadline={deadline} />}
      customerSlot={<ProjectCustomerDetailInfoAlt customer={customer} />}
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
          progress={tasks.total ? (tasks.completed / tasks.total) * 100 : 0}
        />
      }
      tasksStatsSlot={<ProjectTasksStatsDetailInfoAlt tasks={tasks} />}
    />
  );
}
