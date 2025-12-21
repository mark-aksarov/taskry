"use client";

import {
  ActionFn,
  ActionState,
  DeleteProjectsPayload,
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
import { TaskDetailModal } from "../TaskDetailModal";
import { TaskCommentsModal } from "../TaskCommentsModal";
import { useFormatter, useTranslations } from "next-intl";
import { TaskGridItemLayout } from "./TaskGridItemLayout";
import { Checkbox, RACDialogTrigger } from "@/components/ui";
import { useTasksSelection } from "../TasksSelectionContext";
import { UnknownUser } from "@/components/common/UnknownUser";
import { TaskDetailBottomSheet } from "../TaskDetailBottomSheet";
import { ImageContainer } from "@/components/common/ImageContainer";
import { getTaskStatusBadgeColor } from "../getTaskStatusBadgeColor";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { TaskItemActionMenuTrigger } from "../TaskItemActionMenuTrigger";
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
  status: string;
  commentsCount: number;
  subtasksTotal: number;
  subtasksDone: number;
  deleteAction: ActionFn<ActionState, DeleteProjectsPayload>;
}

export function TaskGridItem({
  id,
  title,
  deadline,
  assignee,
  status,
  commentsCount,
  subtasksTotal,
  subtasksDone,
  deleteAction,
}: TaskGridItemProps) {
  const t = useTranslations("tasks");
  const { selectedIds, toggleSelection } = useTasksSelection();

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

  const isSelected = !!selectedIds[id];

  return (
    <TaskGridItemLayout
      checkboxSlot={
        <Checkbox
          aria-label={title}
          isSelected={isSelected}
          onChange={() => toggleSelection(id)}
        />
      }
      menuTriggerSlot={
        <TaskItemActionMenuTrigger
          taskId={id}
          taskTitle={title}
          deleteAction={deleteAction}
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
