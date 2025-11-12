"use client";

import {
  DetailInfo,
  DetailText,
  DetailTitle,
} from "@/components/common/Detail";
import Image from "next/image";
import { useMemo } from "react";
import { TaskDetailLayout } from "./TaskDetailLayout";
import { TaskCommentsModalTrigger } from "../TaskCommentsModalTrigger";
import { TaskDetailStatusMenuTrigger } from "./TaskDetailStatusMenuTrigger";
import { Attachment, Attachments } from "@/components/attachments/Attachments";
import { SubtasksCheckboxGroup } from "@/components/subtasks/SubtasksCheckboxGroup";

interface TaskDetailProps {
  id: number;
  title: string;
  description?: string;
  deadline?: Date;
  category: {
    id: number;
    name: string;
  };
  project: {
    id: number;
    title: string;
  };
  status: {
    id: number;
    name: string;
  };
  subtasks: {
    id: number;
    name: string;
    isDone: boolean;
  }[];
  attachments: {
    id: number;
    fileUrl: string;
    fileName: string;
  }[];
}

export function TaskDetail({
  id,
  title,
  description,
  deadline,
  category,
  project,
  status,
  subtasks,
  attachments,
}: TaskDetailProps) {
  const locale = "en-GB";

  const formattedDeadline = useMemo(() => {
    if (!deadline) return "";
    return new Date(deadline).toLocaleDateString(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, [deadline, locale]);

  return (
    <TaskDetailLayout
      titleSlot={
        <h2 className="text-base font-bold text-black dark:text-white">
          {title}
        </h2>
      }
      statusMenuTriggerSlot={<TaskDetailStatusMenuTrigger />}
      commentsModalTriggerSlot={
        <TaskCommentsModalTrigger commentCount={27} taskId={id} />
      }
      descriptionSlot={
        <DetailInfo>
          <DetailTitle>Description</DetailTitle>
          <DetailText>{description}</DetailText>
        </DetailInfo>
      }
      assigneesSlot={
        <DetailInfo>
          <DetailTitle>Assignees</DetailTitle>
          <DetailText>John Doe</DetailText>
        </DetailInfo>
      }
      deadlineSlot={
        <DetailInfo>
          <DetailTitle>Deadline</DetailTitle>
          <DetailText>{formattedDeadline}</DetailText>
        </DetailInfo>
      }
      creatorSlot={
        <DetailInfo>
          <DetailTitle>Creator</DetailTitle>
          <DetailText>John Doe</DetailText>
        </DetailInfo>
      }
      categoryNameSlot={
        <DetailInfo>
          <DetailTitle>Category</DetailTitle>
          <DetailText>{category.name}</DetailText>
        </DetailInfo>
      }
      projectTitleSlot={
        <DetailInfo>
          <DetailTitle>Project</DetailTitle>
          <DetailText>{project.title}</DetailText>
        </DetailInfo>
      }
      subtasksSlot={
        <DetailInfo>
          <div className="relative">
            <SubtasksCheckboxGroup subtasks={subtasks} />
          </div>
        </DetailInfo>
      }
      attachmentsSlot={
        <DetailInfo className="border-none pb-0">
          <DetailTitle>Attachments</DetailTitle>
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
