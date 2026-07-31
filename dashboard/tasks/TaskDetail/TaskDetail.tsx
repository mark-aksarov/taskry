import React from "react";
import { isPast } from "date-fns";
import { useTranslations } from "next-intl";
import { TaskDetailLayout } from "./TaskDetailLayout";
import { TaskStatus } from "@/generated/prisma/enums";
import { TaskDetailAssignee } from "./TaskDetailAssignee";
import { OverdueBadge } from "@/dashboard/common/OverdueBadge";
import { DeadlineBadge } from "@/dashboard/common/DeadlineBadge";
import { DetailInfo, DetailText, DetailTitle } from "@/dashboard/common/Detail";

interface TaskDetailProps {
  title: string;
  assignee?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };
  creator?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };
  deadline: string;
  description?: string;
  category?: {
    id: number;
    name: string;
  };
  status: TaskStatus;
  project?: {
    id: number;
    title: string;
  };
  subtasksList?: React.ReactNode;
}

export function TaskDetail({
  title,
  assignee,
  creator,
  deadline,
  description,
  category,
  status,
  project,
  subtasksList,
}: TaskDetailProps) {
  const tStatus = useTranslations("dashboard.tasks.TaskStatus");
  const t = useTranslations("dashboard.tasks.TaskDetail");

  const deadlineDate = new Date(deadline);

  return (
    <TaskDetailLayout
      titleSlot={
        <h2 className="text-base font-bold text-(--text-primary)">{title}</h2>
      }
      assigneesSlot={
        <DetailInfo>
          <DetailTitle>{t("assignee")}</DetailTitle>
          <TaskDetailAssignee assignee={assignee} />
        </DetailInfo>
      }
      deadlineSlot={
        <DetailInfo className="md:gap-3.5">
          <DetailTitle>{t("deadline")}</DetailTitle>
          <div className="flex w-full items-center justify-between">
            <DeadlineBadge deadline={deadlineDate} className="self-start" />
            {isPast(deadlineDate) && <OverdueBadge deadline={deadlineDate} />}
          </div>
        </DetailInfo>
      }
      descriptionSlot={
        <DetailInfo>
          <DetailTitle>{t("description")}</DetailTitle>
          <DetailText>
            {description ? description : t("noDescription")}
          </DetailText>
        </DetailInfo>
      }
      creatorSlot={
        <DetailInfo>
          <DetailTitle>{t("creator")}</DetailTitle>
          {creator ? (
            <DetailText>{creator.fullName}</DetailText>
          ) : (
            <DetailText>{t("noCreator")}</DetailText>
          )}
        </DetailInfo>
      }
      categoryNameSlot={
        <DetailInfo>
          <DetailTitle>{t("category")}</DetailTitle>
          <DetailText>{category ? category.name : t("noCategory")}</DetailText>
        </DetailInfo>
      }
      statusSlot={
        <DetailInfo>
          <DetailTitle>{t("status")}</DetailTitle>
          <DetailText>{tStatus(status)}</DetailText>
        </DetailInfo>
      }
      projectTitleSlot={
        <DetailInfo>
          <DetailTitle>{t("project")}</DetailTitle>
          {project ? (
            <DetailText>{project.title}</DetailText>
          ) : (
            <DetailText>{t("noProject")}</DetailText>
          )}
        </DetailInfo>
      }
      subtasksSlot={
        <DetailInfo className="border-none pb-0">
          <DetailTitle>{t("subtasks")}</DetailTitle>
          {subtasksList ? (
            subtasksList
          ) : (
            <DetailText>{t("noSubtasks")}</DetailText>
          )}
        </DetailInfo>
      }
    />
  );
}
