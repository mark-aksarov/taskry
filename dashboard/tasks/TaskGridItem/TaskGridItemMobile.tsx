"use client";

import {
  GridItemInfo,
  GridItemText,
  GridItemTitle,
} from "@/dashboard/common/GridItem";

import {
  ItemBaseDeadline,
  ItemBaseCommentsButton,
  ItemBaseUserImageContainer,
} from "@/dashboard/common/ItemBase";

import { memo } from "react";
import { twMerge } from "tailwind-merge";
import { BaseLink } from "@/ui/Link";
import { TaskItemActionMenuTrigger } from "../TaskItem";
import { TaskGridItemLayout } from "./TaskGridItemLayout";
import { TaskItemStatusBadge } from "../TaskItemStatusBadge";
import { TaskGridItemProgress } from "./TaskGridItemProgress";
import { useModal } from "@/common/ModalManagerContext";
import { BaseTaskItemProps, useTaskItemPending } from "../TaskItem";
import { TaskGridItemMobileSkeleton } from "./TaskGridItemSkeleton";
import { GridItemMobileGate } from "@/dashboard/common/GridItemMobileGate";

export interface TaskGridItemMobileProps extends BaseTaskItemProps {
  subtasksTotal: number;
  subtasksDone: number;
}

export function TaskGridItemMobile(props: TaskGridItemMobileProps) {
  const isPending = useTaskItemPending(props.id);

  return (
    <GridItemMobileGate skeleton={<TaskGridItemMobileSkeleton />}>
      <TaskGridItemMobileInner {...props} isPending={isPending} />
    </GridItemMobileGate>
  );
}

type InnerProps = TaskGridItemMobileProps & { isPending: boolean };

export const TaskGridItemMobileInner = memo(function TaskGridItemMobileInner({
  id,
  isPending,
  title,
  deadline,
  assignee,
  commentsCount,
  status,
  subtasksTotal,
  subtasksDone,
}: InnerProps) {
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
    <div
      className={twMerge("relative block", isPending && "pointer-events-none")}
    >
      <BaseLink
        aria-label={title}
        href={`/tasks/${id}`}
        className="absolute inset-0 z-0"
      />

      <TaskGridItemLayout
        className={isPending ? "*:opacity-50" : undefined}
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
            <BaseLink
              aria-label={assignee.fullName}
              href={`/team/${assignee.id}`}
            >
              {assigneeImg}
            </BaseLink>
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
          <TaskItemStatusBadge
            taskId={id}
            deadline={deadline}
            status={status}
          />
        }
        progressSlot={
          <TaskGridItemProgress
            subtasksDone={subtasksDone}
            subtasksTotal={subtasksTotal}
          />
        }
      />
    </div>
  );
});
