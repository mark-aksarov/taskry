"use client";

import {
  GridItemInfo,
  GridItemText,
  GridItemTitle,
  GridItemProgress,
} from "@/components/common/Grid";

import {
  ItemBaseBadge,
  ItemBaseDetailModalTrigger,
  ItemBaseDetailBottomSheetTrigger,
} from "@/components/common/ItemBase";

import Image from "next/image";
import { TaskStatus } from "@/generated/prisma/enums";
import { useFormatter, useTranslations } from "next-intl";
import { TaskGridItemLayout } from "./TaskGridItemLayout";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ImageContainer } from "@/components/common/ImageContainer";
import { getTaskStatusBadgeColor } from "../getTaskStatusBadgeColor";
import { useSyncSelectionTaskItem } from "@/lib/hooks/useTaskSelection";
import { TaskListItemCheckbox } from "../TaskListItem/TaskListItemCheckbox";
import { TaskCommentsModalTrigger } from "../TaskCommentsModalTrigger";

export interface TaskGridItemProps {
  id: number;
  title: string;
  deadline: Date;
  assignee?: {
    id: string;
    imageUrl?: string;
    fullName: string;
  };
  commentsCount: number;
  status: TaskStatus;
  subtasksTotal: number;
  subtasksDone: number;
  taskCommentsModal: React.ReactNode;
  menuTrigger: React.ReactNode;
  taskDetailModal: React.ReactNode;
  taskDetailBottomSheet: React.ReactNode;
  userDetailModal: React.ReactNode;
  userDetailBottomSheet: React.ReactNode;
}

export function TaskGridItem({
  id,
  title,
  deadline,
  assignee,
  commentsCount,
  status,
  subtasksTotal,
  subtasksDone,
  taskCommentsModal,
  menuTrigger,
  taskDetailModal,
  taskDetailBottomSheet,
  userDetailModal,
  userDetailBottomSheet,
}: TaskGridItemProps) {
  const tStatus = useTranslations("tasks.TaskStatus");
  const t = useTranslations("tasks.TaskGridItem");

  useSyncSelectionTaskItem(id, title, status);

  const format = useFormatter();

  const deadlineOn = t("deadlineOn", {
    date: format.dateTime(deadline, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  });

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
      menuTriggerSlot={menuTrigger}
      titleSlot={
        <GridItemInfo className="flex-auto">
          <GridItemTitle>
            <ItemBaseDetailModalTrigger
              modal={taskDetailModal}
              className="truncate"
            >
              {title}
            </ItemBaseDetailModalTrigger>

            <ItemBaseDetailBottomSheetTrigger
              bottomSheet={taskDetailBottomSheet}
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
            <ItemBaseDetailModalTrigger modal={userDetailModal}>
              {assigneeImg}
            </ItemBaseDetailModalTrigger>

            <ItemBaseDetailBottomSheetTrigger
              bottomSheet={userDetailBottomSheet}
            >
              {assigneeImg}
            </ItemBaseDetailBottomSheetTrigger>
          </>
        ) : (
          <UnknownUser className="h-9 w-9" />
        )
      }
      commentsSlot={
        <TaskCommentsModalTrigger
          data-test={`task-${id}-comments-modal-trigger`}
          commentsCount={commentsCount}
          modal={taskCommentsModal}
        />
      }
      statusSlot={
        <ItemBaseBadge color={getTaskStatusBadgeColor(status)}>
          {tStatus(`${status}`)}
        </ItemBaseBadge>
      }
      progressSlot={
        <GridItemProgress
          value={(subtasksDone / subtasksTotal) * 100}
          showValueText={false}
          aria-label={t("progressAriaLabel")}
        />
      }
    />
  );
}
