"use client";

import {
  ItemBaseDetailButton,
  ItemBaseCommentsButton,
  ItemBaseUserImageContainer,
} from "@/dashboard/common/ItemBase";

import { memo } from "react";
import { TaskItemActionMenuTrigger } from "../TaskItem";
import { TaskGridItemLayout } from "./TaskGridItemLayout";
import { SelectableTaskItem } from "../SelectableTaskItem";
import { TaskItemStatusBadge } from "../TaskItemStatusBadge";
import { TaskGridItemProgress } from "./TaskGridItemProgress";
import { ListItemTitleButton } from "@/dashboard/common/ListItem";
import { ItemBaseDeadline } from "@/dashboard/common/ItemBase";
import { TaskItemCheckbox } from "../TaskItem/TaskItemCheckbox";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { TaskGridItemLargeSkeleton } from "./TaskGridItemSkeleton";
import { BaseTaskItemProps, useTaskItemPending } from "../TaskItem";
import { GridItemInfo, GridItemText } from "@/dashboard/common/GridItem";
import { GridItemLargeGate } from "@/dashboard/common/GridItemLargeGate";

interface Props extends BaseTaskItemProps {
  subtasksTotal: number;
  subtasksDone: number;
}

export function TaskGridItemLarge(props: Props) {
  const isPending = useTaskItemPending(props.id);

  return (
    <GridItemLargeGate skeleton={<TaskGridItemLargeSkeleton />}>
      <SelectableTaskItem taskId={props.id} taskStatus={props.status}>
        <TaskGridItemLargeInner {...props} isPending={isPending} />
      </SelectableTaskItem>
    </GridItemLargeGate>
  );
}

type InnerProps = Props & { isPending: boolean };

export const TaskGridItemLargeInner = memo(function TaskGridItemLargeInner({
  id,
  title,
  deadline,
  assignee,
  commentsCount,
  status,
  subtasksTotal,
  subtasksDone,
  isPending,
}: InnerProps) {
  const assigneeImg = (
    <ItemBaseUserImageContainer
      user={assignee}
      className="h-9 w-9"
      width={36}
      height={36}
    />
  );

  const { onOpenChange: onTaskDetailModalOpenChange } = useModal("taskDetail");
  const { onOpenChange: onUserDetailModalOpenChange } = useModal("userDetail");
  const { onOpenChange: onTaskCommentsModalOpenChange } =
    useModal("taskComments");

  return (
    <TaskGridItemLayout
      className={isPending ? "*:opacity-50" : undefined}
      checkboxSlot={<TaskItemCheckbox id={id} status={status} />}
      menuTriggerSlot={
        <TaskItemActionMenuTrigger
          taskId={id}
          taskStatus={status}
          className="-mr-2"
        />
      }
      titleSlot={
        <GridItemInfo className="flex-auto">
          <ListItemTitleButton
            onPress={() => onTaskDetailModalOpenChange(true)}
          >
            {title}
          </ListItemTitleButton>

          <GridItemText>
            <ItemBaseDeadline deadline={deadline} />
          </GridItemText>
        </GridItemInfo>
      }
      assigneeImageSlot={
        assignee ? (
          <ItemBaseDetailButton
            aria-label={assignee.fullName}
            onPress={() => onUserDetailModalOpenChange(true)}
          >
            {assigneeImg}
          </ItemBaseDetailButton>
        ) : (
          assigneeImg
        )
      }
      commentsSlot={
        <ItemBaseCommentsButton
          commentsCount={commentsCount}
          onPress={() => onTaskCommentsModalOpenChange(true)}
        />
      }
      statusSlot={
        <TaskItemStatusBadge taskId={id} deadline={deadline} status={status} />
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
