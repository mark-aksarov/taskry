"use client";

import {
  DetailInfo,
  DetailText,
  DetailTitle,
} from "@/components/common/Detail";

import Image from "next/image";
import { Badge, Link } from "@/components/ui";
import { useFormatter, useTranslations } from "next-intl";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ImageContainer } from "@/components/common/ImageContainer";
import { TaskDetailCompactLayout } from "./TaskDetailCompactLayout";
import { Attachment, Attachments } from "@/components/attachments/Attachments";
import { SubtasksCheckboxGroup } from "@/components/subtasks/SubtasksCheckboxGroup";
import { NewSubtaskModalTrigger } from "@/components/subtasks/NewSubtaskModalTrigger";
import { TaskDetailCompactStatusMenuTrigger } from "./TaskDetailCompactStatusMenuTrigger";
import { NewSubtaskBottomSheetTrigger } from "@/components/subtasks/NewSubtaskBottomSheetTrigger";

interface TaskDetailCompactProps {
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
  deadline: Date;
  description?: string;
  category: {
    id: number;
    name: string;
  };
  project: {
    id: number;
    title: string;
  };
  status: {
    id: string;
    name: string;
  };
  subtasks: {
    id: number;
    text: string;
    isDone: boolean;
  }[];
  attachments: {
    id: number;
    fileUrl: string;
    fileName: string;
  }[];
}

export function TaskDetailCompact({
  id,
  title,
  assignee,
  creator,
  deadline,
  description,
  category,
  project,
  status,
  subtasks,
  attachments,
}: TaskDetailCompactProps) {
  const t = useTranslations("tasks.TaskDetailCompact");

  const format = useFormatter();

  const formattedDeadline = deadline
    ? format.dateTime(new Date(deadline), {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : t("noDeadline");

  return (
    <TaskDetailCompactLayout
      titleSlot={
        <h2 className="text-base font-bold text-black dark:text-white">
          {title}
        </h2>
      }
      actionsSlot={<TaskDetailCompactStatusMenuTrigger />}
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
      projectTitleSlot={
        <DetailInfo>
          <DetailTitle>{t("project")}</DetailTitle>
          <DetailText>{project.title}</DetailText>
        </DetailInfo>
      }
      subtasksSlot={
        <DetailInfo>
          <SubtasksCheckboxGroup subtasks={subtasks} />
          <NewSubtaskBottomSheetTrigger />
          <NewSubtaskModalTrigger />
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
