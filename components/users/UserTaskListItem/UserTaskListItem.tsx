"use client";

import {
  BaseTaskItemProps,
  useTaskItemPending,
} from "@/components/tasks/TaskItem";

import {
  ItemBaseDeadline,
  ItemBaseCommentsButton,
} from "@/components/common/ItemBase";

import { memo } from "react";
import { ListItemGate } from "@/components/common/ListItemGate";
import { UserTaskListItemLayout } from "./UserTaskListItemLayout";
import { useModal } from "@/components/common/ModalManagerContext";
import { UserTaskListItemSkeleton } from "./UserTaskListItemSkeleton";
import { TaskItemActionMenuTrigger } from "@/components/tasks/TaskItem";
import { SelectableTaskItem } from "@/components/tasks/SelectableTaskItem";
import { TaskItemStatusBadge } from "@/components/tasks/TaskItemStatusBadge";
import {
  ListItemText,
  ListItemTitleButton,
} from "@/components/common/ListItem";
import { TaskItemCheckbox } from "@/components/tasks/TaskItem/TaskItemCheckbox";

export const UserTaskListItem = (props: BaseTaskItemProps) => {
  const isPending = useTaskItemPending(props.id);

  return (
    <ListItemGate skeleton={<UserTaskListItemSkeleton />}>
      <SelectableTaskItem taskId={props.id} taskStatus={props.status}>
        <UserTaskListItemInner {...props} isPending={isPending} />
      </SelectableTaskItem>
    </ListItemGate>
  );
};

type InnerProps = BaseTaskItemProps & { isPending: boolean };

export const UserTaskListItemInner = memo(function UserTaskListItemInner({
  id,
  isPending,
  title,
  deadline,
  status,
  commentsCount,
}: InnerProps) {
  const { onOpenChange: onTaskDetailModalOpenChange } = useModal("taskDetail");
  const { onOpenChange: onTaskCommentsModalOpenChange } =
    useModal("taskComments");

  return (
    <UserTaskListItemLayout
      className={isPending ? "*:opacity-50" : undefined}
      checkboxSlot={<TaskItemCheckbox id={id} status={status} />}
      mainSlot={
        <>
          <ListItemTitleButton
            onPress={() => onTaskDetailModalOpenChange(true)}
          >
            {title}
          </ListItemTitleButton>
          <ListItemText>
            <ItemBaseDeadline deadline={deadline} />
          </ListItemText>
        </>
      }
      statusSlot={
        <TaskItemStatusBadge taskId={id} deadline={deadline} status={status} />
      }
      commentsModalTriggerSlot={
        <ItemBaseCommentsButton
          commentsCount={commentsCount}
          onPress={() => onTaskCommentsModalOpenChange(true)}
        />
      }
      menuTriggerSlot={
        <TaskItemActionMenuTrigger taskId={id} taskStatus={status} />
      }
    />
  );
});
