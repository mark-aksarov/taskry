"use client";

import {
  GridItemInfo,
  GridItemText,
  GridItemTitle,
} from "@/components/common/Grid";

import {
  ItemBaseDeadline,
  ItemBaseCommentsButton,
  ItemBaseUserImageContainer,
} from "@/components/common/ItemBase";

import { memo } from "react";
import { Link } from "@/components/ui/Link";
import { BaseTaskItemProps } from "../TaskItem";
import { TaskItemBaseBadge } from "../TaskItemBaseBadge";
import { TaskGridItemLayout } from "./TaskGridItemLayout";
import { TaskGridItemProgress } from "./TaskGridItemProgress";
import { useModal } from "@/components/common/ModalManagerContext";
import { TaskItemActionMenuTrigger, TaskItemPendingOverlay } from "../TaskItem";

export interface TaskGridItemMobileProps extends BaseTaskItemProps {
  subtasksTotal: number;
  subtasksDone: number;
}

export function TaskGridItemMobile(props: TaskGridItemMobileProps) {
  return (
    <TaskItemPendingOverlay taskId={props.id}>
      <div className="relative block">
        <Link
          aria-label={props.title}
          href={`/tasks/${props.id}`}
          className="absolute inset-0 z-0"
        />
        <TaskGridItemMobileInner {...props} />
      </div>
    </TaskItemPendingOverlay>
  );
}

export const TaskGridItemMobileInner = memo(function TaskGridItemMobileInner({
  id,
  title,
  deadline,
  assignee,
  commentsCount,
  status,
  subtasksTotal,
  subtasksDone,
}: TaskGridItemMobileProps) {
  const assigneeImg = (
    <ItemBaseUserImageContainer
      user={assignee}
      className="z-1 h-11 w-11"
      width={44}
      height={44}
    />
  );

  const { onOpenChange: onTaskCommentsModalOpenChange } =
    useModal("taskComments");

  return (
    <TaskGridItemLayout
      menuTriggerSlot={
        <TaskItemActionMenuTrigger
          taskId={id}
          taskStatus={status}
          className="relative z-1 -mr-2 ml-auto"
        />
      }
      titleSlot={
        <GridItemInfo className="flex-auto">
          <GridItemTitle>{title}</GridItemTitle>
          <GridItemText>
            <ItemBaseDeadline deadline={deadline} />
          </GridItemText>
        </GridItemInfo>
      }
      assigneeImageSlot={
        assignee ? (
          <Link aria-label={assignee.fullName} href={`/team/${assignee.id}`}>
            {assigneeImg}
          </Link>
        ) : (
          assigneeImg
        )
      }
      commentsSlot={
        <ItemBaseCommentsButton
          commentsCount={commentsCount}
          onPress={() => onTaskCommentsModalOpenChange(true)}
          className="relative z-1"
        />
      }
      statusSlot={
        <TaskItemBaseBadge taskId={id} deadline={deadline} status={status} />
      }
      progressSlot={
        <TaskGridItemProgress
          subtasksDone={subtasksDone}
          subtasksTotal={subtasksTotal}
        />
      }
    />
  );
});
