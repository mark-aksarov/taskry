import {
  DetailLink,
  DetailInfo,
  DetailText,
  DetailTitle,
} from "@/components/common/Detail";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { TaskDetailLayout } from "./TaskDetailLayout";
import { TaskStatus } from "@/generated/prisma/enums";
import { useFormatter, useTranslations } from "next-intl";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ImageContainer } from "@/components/common/ImageContainer";
import { CreateSubtasksButton } from "@/components/subtasks/CreateSubtaskButton";

interface TaskDetailProps {
  id: number;
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
  deadline?: string;
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
  id,
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

  const assigneeImg = assignee?.imageUrl ? (
    <ImageContainer className="h-9 w-9">
      <Image
        src={assignee.imageUrl}
        alt={assignee.fullName}
        width={36}
        height={36}
      />
    </ImageContainer>
  ) : (
    <UnknownUser className="h-9 w-9" />
  );

  return (
    <TaskDetailLayout
      titleSlot={
        <h2 className="text-base font-bold text-black dark:text-white">
          {title}
        </h2>
      }
      assigneesSlot={
        <DetailInfo>
          <DetailTitle>{t("assignee")}</DetailTitle>
          {assignee ? (
            <DetailLink
              href={`/team/${assignee.id}`}
              className="flex items-center gap-2"
            >
              {assigneeImg}
              <DetailText>{assignee.fullName}</DetailText>
            </DetailLink>
          ) : (
            <div className="flex items-center gap-2">
              {assigneeImg}
              <DetailText>{t("noAssignee")}</DetailText>
            </div>
          )}
        </DetailInfo>
      }
      deadlineSlot={
        <DetailInfo className="md:gap-3.5">
          <DetailTitle>{t("deadline")}</DetailTitle>
          <Badge color="gray" className="self-start">
            {formattedDeadline}
          </Badge>
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
            <DetailLink href={`/projects/${project.id}`}>
              <DetailText>{project.title}</DetailText>
            </DetailLink>
          ) : (
            <DetailText>{t("noProject")}</DetailText>
          )}
        </DetailInfo>
      }
      subtasksSlot={
        <DetailInfo className="border-none pb-0">
          <DetailTitle>{t("subtasks")}</DetailTitle>
          {subtasksList}
          <CreateSubtasksButton />
        </DetailInfo>
      }
    />
  );
}
