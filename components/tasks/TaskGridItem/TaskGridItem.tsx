"use client";

import {
  ActionFn,
  ActionState,
  DeleteProjectsPayload,
  UpdateTaskStatusesPayload,
} from "@/lib/actions/types";

import {
  GridItemInfo,
  GridItemText,
  GridItemTitle,
  GridItemProgress,
} from "@/components/common/Grid";

import {
  ItemBaseBadge,
  ItemBaseButton,
  ItemBaseDetailModalTrigger,
  ItemBaseDetailBottomSheetTrigger,
} from "@/components/common/ItemBase";

import Image from "next/image";
import { MessageSquare } from "lucide-react";
import { RACDialogTrigger } from "@/components/ui";
import { TaskDetailModal } from "../TaskDetailModal";
import { TaskCommentsModal } from "../TaskCommentsModal";
import { useFormatter, useTranslations } from "next-intl";
import { TaskGridItemLayout } from "./TaskGridItemLayout";
import { UnknownUser } from "@/components/common/UnknownUser";
import { TaskDetailBottomSheet } from "../TaskDetailBottomSheet";
import { ImageContainer } from "@/components/common/ImageContainer";
import { getTaskStatusBadgeColor } from "../getTaskStatusBadgeColor";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";
import { useSyncSelectionTaskItem } from "@/lib/hooks/useTaskSelection";
import { TaskItemActionMenuTrigger } from "../TaskItemActionMenuTrigger";
import { TaskListItemCheckbox } from "../TaskListItem/TaskListItemCheckbox";
import { UserDetailBottomSheet } from "@/components/users/UserDetailBottomSheet";

export interface TaskGridItemProps {
  id: number;
  title: string;
  deadline?: Date;
  assignee?: {
    id: string;
    imageUrl?: string;
    fullName: string;
  };
  status: TaskStatus;
  projectStatus: ProjectStatus;
  commentsCount: number;
  subtasksTotal: number;
  subtasksDone: number;
  deleteAction: ActionFn<ActionState, DeleteProjectsPayload>;
  updateStatusAction: ActionFn<ActionState, UpdateTaskStatusesPayload>;
}

export function TaskGridItem({
  id,
  title,
  deadline,
  assignee,
  status,
  projectStatus,
  commentsCount,
  subtasksTotal,
  subtasksDone,
  deleteAction,
  updateStatusAction,
}: TaskGridItemProps) {
  const t = useTranslations("tasks");

  useSyncSelectionTaskItem(id, title, status, projectStatus);

  const format = useFormatter();

  const deadlineOn = deadline
    ? t("TaskGridItem.deadlineOn", {
        date: format.dateTime(deadline, {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      })
    : t("TaskGridItem.noDeadline");

  const assigneeImg = assignee?.imageUrl ? (
    <ImageContainer className="h-9 w-9">
      <Image fill src={assignee.imageUrl} alt={assignee.fullName} />
    </ImageContainer>
  ) : (
    <UnknownUser className="h-9 w-9" />
  );

  return (
    <TaskGridItemLayout
      checkboxSlot={<TaskListItemCheckbox id={id} />}
      menuTriggerSlot={
        <TaskItemActionMenuTrigger
          taskId={id}
          taskTitle={title}
          taskStatus={status}
          projectStatus={projectStatus}
          deleteAction={deleteAction}
          updateStatusAction={updateStatusAction}
          className="-mr-2"
        />
      }
      titleSlot={
        <GridItemInfo className="flex-auto">
          <GridItemTitle>
            <ItemBaseDetailModalTrigger
              modal={<TaskDetailModal taskId={id} />}
              className="truncate"
            >
              {title}
            </ItemBaseDetailModalTrigger>

            <ItemBaseDetailBottomSheetTrigger
              renderBottomSheet={(state) => (
                <TaskDetailBottomSheet taskId={id} state={state} />
              )}
              className="truncate"
            >
              {title}
            </ItemBaseDetailBottomSheetTrigger>
          </GridItemTitle>

          <GridItemText>{deadlineOn}</GridItemText>
        </GridItemInfo>
      }
      assigneeImageSlot={
        assignee ? (
          <>
            <ItemBaseDetailModalTrigger
              modal={<UserDetailModal userId={assignee.id} />}
            >
              {assigneeImg}
            </ItemBaseDetailModalTrigger>

            <ItemBaseDetailBottomSheetTrigger
              renderBottomSheet={(state) => (
                <UserDetailBottomSheet userId={assignee.id} state={state} />
              )}
            >
              {assigneeImg}
            </ItemBaseDetailBottomSheetTrigger>
          </>
        ) : (
          <UnknownUser className="h-9 w-9" />
        )
      }
      commentsSlot={
        <RACDialogTrigger>
          <ItemBaseButton
            label={commentsCount}
            iconLeft={
              <MessageSquare size={16} strokeWidth={1.5} absoluteStrokeWidth />
            }
          />
          <TaskCommentsModal taskId={id} />
        </RACDialogTrigger>
      }
      statusSlot={
        <ItemBaseBadge color={getTaskStatusBadgeColor(status)}>
          {t(`TaskStatus.${status}`)}
        </ItemBaseBadge>
      }
      progressSlot={
        <GridItemProgress
          value={(subtasksDone / subtasksTotal) * 100}
          showValueText={false}
          aria-label={t("TaskGridItem.progressAriaLabel")}
        />
      }
    />
  );
}
