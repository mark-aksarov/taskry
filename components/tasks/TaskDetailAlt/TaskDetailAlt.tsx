import {
  DetailInfo,
  DetailLink,
  DetailText,
  DetailTitle,
} from "@/components/common/Detail";

import { TaskStatus } from "@/generated/prisma/enums";
import { useFormatter, useTranslations } from "next-intl";
import { TaskDetailAltLayout } from "./TaskDetailAltLayout";
import { NewSubtasksButton } from "@/components/subtasks/NewSubtaskButton";

interface TaskDetailAltProps {
  id: number;
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
  project?: {
    id: number;
    title: string;
  };
  status: TaskStatus;
  subtasksList?: React.ReactNode;
}

export function TaskDetailAlt({
  id,
  assignee,
  creator,
  deadline,
  description,
  category,
  project,
  status,
  subtasksList,
}: TaskDetailAltProps) {
  const tStatus = useTranslations("tasks.TaskStatus");
  const t = useTranslations("tasks.TaskDetail");

  const format = useFormatter();

  const formattedDeadline = format.dateTime(new Date(deadline), {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <TaskDetailAltLayout
      descriptionSlot={
        <DetailInfo>
          <DetailTitle>{t("description")}</DetailTitle>
          <DetailText>
            {description ? description : t("noDescription")}
          </DetailText>
        </DetailInfo>
      }
      assigneesSlot={
        <DetailInfo>
          <DetailTitle>{t("assignee")}</DetailTitle>
          {assignee ? (
            <DetailLink href={`/team/${assignee.id}`}>
              <DetailText>{assignee.fullName}</DetailText>
            </DetailLink>
          ) : (
            <DetailText>{t("noAssignee")}</DetailText>
          )}
        </DetailInfo>
      }
      deadlineSlot={
        <DetailInfo>
          <DetailTitle>{t("deadline")}</DetailTitle>
          <DetailText>{formattedDeadline}</DetailText>
        </DetailInfo>
      }
      creatorSlot={
        <DetailInfo>
          <DetailTitle>{t("creator")}</DetailTitle>
          {creator ? (
            <DetailLink href={`/team/${creator.id}`}>
              <DetailText>{creator.fullName}</DetailText>
            </DetailLink>
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
      projectTitleSlot={
        <DetailInfo>
          <DetailTitle>{t("project")}</DetailTitle>
          {project ? (
            <DetailLink href={`/projects/${project.id}`}>
              <DetailText>{project.title}</DetailText>
            </DetailLink>
          ) : (
            <DetailText>{t("noProject")}</DetailText>
          )}
        </DetailInfo>
      }
      statusSlot={
        <DetailInfo>
          <DetailTitle>{t("status")}</DetailTitle>
          <DetailText>{tStatus(status)}</DetailText>
        </DetailInfo>
      }
      subtasksSlot={
        <DetailInfo className="border-none pb-0">
          <DetailTitle>{t("subtasks")}</DetailTitle>
          {subtasksList}
          <NewSubtasksButton />
        </DetailInfo>
      }
    />
  );
}
