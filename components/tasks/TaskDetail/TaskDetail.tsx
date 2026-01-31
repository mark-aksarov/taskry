import {
  DetailInfo,
  DetailText,
  DetailTitle,
} from "@/components/common/Detail";

import React from "react";
import Image from "next/image";
import { Link } from "@/components/ui/Link";
import { Badge } from "@/components/ui/Badge";
import { TaskDetailLayout } from "./TaskDetailLayout";
import { TaskStatus } from "@/generated/prisma/enums";
import { useFormatter, useTranslations } from "next-intl";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ImageContainer } from "@/components/common/ImageContainer";
import { Attachment, Attachments } from "@/components/attachments/Attachments";

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
  deadline?: Date;
  description?: string;
  category: {
    id: number;
    name: string;
  };
  status: TaskStatus;
  project: {
    id: number;
    title: string;
  };
  attachments: {
    id: number;
    fileUrl: string;
    fileName: string;
  }[];
  subtasksList?: React.ReactNode;
  newSubtaskModalTrigger: React.ReactNode;
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
  attachments,
  subtasksList,
  newSubtaskModalTrigger,
}: TaskDetailProps) {
  const t = useTranslations("tasks.TaskDetail");
  const tStatus = useTranslations("tasks.TaskStatus");

  const format = useFormatter();

  const formattedDeadline = deadline
    ? format.dateTime(new Date(deadline), {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : t("noDeadline");

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
          <div className="flex items-center gap-2">
            {assignee?.imageUrl ? (
              <Link href={`/users/${id}`}>
                <ImageContainer className="h-9 w-9">
                  <Image fill src={assignee.imageUrl} alt={assignee.fullName} />
                </ImageContainer>
              </Link>
            ) : (
              <UnknownUser className="h-9 w-9" />
            )}
            <DetailText>
              {assignee ? assignee.fullName : t("noAssignee")}
            </DetailText>
          </div>
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
          <DetailText>
            {creator ? creator.fullName : t("unknownCreator")}
          </DetailText>
        </DetailInfo>
      }
      categoryNameSlot={
        <DetailInfo>
          <DetailTitle>{t("category")}</DetailTitle>
          <DetailText>{category.name}</DetailText>
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
          <DetailText>{project.title}</DetailText>
        </DetailInfo>
      }
      subtasksSlot={
        <DetailInfo>
          <DetailTitle>{t("subtasks")}</DetailTitle>
          {subtasksList}
          {newSubtaskModalTrigger}
        </DetailInfo>
      }
      attachmentsSlot={
        <DetailInfo className="border-none pb-0">
          <DetailTitle>{t("attachments")}</DetailTitle>
          {attachments.length > 0 && (
            <Attachments>
              {attachments.map((attachment) => (
                <Attachment key={attachment.id}>
                  <Image
                    src={attachment.fileUrl}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </Attachment>
              ))}
            </Attachments>
          )}
        </DetailInfo>
      }
    />
  );
}
