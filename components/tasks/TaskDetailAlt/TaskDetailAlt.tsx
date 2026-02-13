import {
  DetailInfo,
  DetailText,
  DetailTitle,
} from "@/components/common/Detail";

import Image from "next/image";
import { TaskStatus } from "@/generated/prisma/enums";
import { useFormatter, useTranslations } from "next-intl";
import { TaskDetailAltLayout } from "./TaskDetailAltLayout";

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
  deadline?: Date;
  description?: string;
  category?: {
    id: number;
    name: string;
  };
  project: {
    id: number;
    title: string;
  };
  status: TaskStatus;
  subtasksList?: React.ReactNode;
  newSubtaskModalTrigger: React.ReactNode;
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
  newSubtaskModalTrigger,
}: TaskDetailAltProps) {
  const tStatus = useTranslations("tasks.TaskStatus");
  const t = useTranslations("tasks.TaskDetail");

  const format = useFormatter();

  const formattedDeadline = deadline
    ? format.dateTime(new Date(deadline), {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : t("noDeadline");

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
          <DetailText>
            {assignee ? assignee.fullName : t("noAssignee")}
          </DetailText>
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
          <DetailText>{creator ? creator.fullName : t("noCreator")}</DetailText>
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
          <DetailText>{project.title}</DetailText>
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
          {newSubtaskModalTrigger}
        </DetailInfo>
      }
    />
  );
}
