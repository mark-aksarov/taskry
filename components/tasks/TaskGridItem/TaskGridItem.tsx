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
import { TaskDetailModal } from "../TaskDetailModal";
import { TaskStatus } from "@/generated/prisma/enums";
import { useFormatter, useTranslations } from "next-intl";
import { TaskGridItemLayout } from "./TaskGridItemLayout";
import { UnknownUser } from "@/components/common/UnknownUser";
import { TaskDetailBottomSheet } from "../TaskDetailBottomSheet";
import { ImageContainer } from "@/components/common/ImageContainer";
import { getTaskStatusBadgeColor } from "../getTaskStatusBadgeColor";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { useSyncSelectionTaskItem } from "@/lib/hooks/useTaskSelection";
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
  subtasksTotal: number;
  subtasksDone: number;
  commentModalTrigger?: React.ReactNode;
  menuTrigger?: React.ReactNode;
}

export function TaskGridItem({
  id,
  title,
  deadline,
  assignee,
  status,
  subtasksTotal,
  subtasksDone,
  commentModalTrigger,
  menuTrigger,
}: TaskGridItemProps) {
  const t = useTranslations("tasks");

  useSyncSelectionTaskItem(id, title, status);

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
      menuTriggerSlot={menuTrigger}
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
      commentsSlot={commentModalTrigger}
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
