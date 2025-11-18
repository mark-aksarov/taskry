"use client";

import {
  DetailInfo,
  DetailText,
  DetailTitle,
} from "@/components/common/Detail";
import Image from "next/image";
import { useMemo } from "react";
import { TaskDetailLayout } from "./TaskDetailLayout";
import { TaskDetailStatusMenuTrigger } from "./TaskDetailStatusMenuTrigger";
import { Attachment, Attachments } from "@/components/attachments/Attachments";
import { SubtasksCheckboxGroup } from "@/components/subtasks/SubtasksCheckboxGroup";
import { Badge, Button, Link } from "@/components/ui";
import { ExternalLink } from "lucide-react";
import { ImageContainer } from "@/components/common/ImageContainer";
import { NewSubtasksButton } from "@/components/subtasks/NewSubtaskButton";
import { UnknownUser } from "@/components/common/UnknownUser";
import { NewSubtaskBottomSheetTrigger } from "@/components/subtasks/NewSubtaskBottomSheetTrigger";
import { NewSubtaskPopoverTrigger } from "@/components/subtasks/NewSubtaskPopoverTrigger";

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

export function TaskDetail({
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
      openTaskSlot={
        <Button
          variant="outlined"
          className="rounded-lg"
          iconLeft={
            <ExternalLink size={16} strokeWidth={1.5} absoluteStrokeWidth />
          }
        />
      }
      assigneesSlot={
        <DetailInfo>
          <DetailTitle>Assignee</DetailTitle>
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
              {assignee ? assignee.fullName : "Unassigned"}
            </DetailText>
          </div>
        </DetailInfo>
      }
      deadlineSlot={
        <DetailInfo className="md:gap-3.5">
          <DetailTitle>Deadline</DetailTitle>
          <Badge color="gray" className="self-start">
            {formattedDeadline}
          </Badge>
        </DetailInfo>
      }
      descriptionSlot={
        <DetailInfo>
          <DetailTitle>Description</DetailTitle>
          <DetailText>
            {description ? description : "No description"}
          </DetailText>
        </DetailInfo>
      }
      creatorSlot={
        <DetailInfo>
          <DetailTitle>Creator</DetailTitle>
          <DetailText>
            {creator ? creator.fullName : "Unknown creator"}
          </DetailText>
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
          <SubtasksCheckboxGroup subtasks={subtasks} />
          <NewSubtaskBottomSheetTrigger />
          <NewSubtaskPopoverTrigger />
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
