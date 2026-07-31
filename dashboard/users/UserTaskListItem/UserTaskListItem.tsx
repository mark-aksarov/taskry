"use client";

import {
  BaseTaskItemProps,
  useTaskItemPending,
} from "@/dashboard/tasks/TaskItem";

import {
  ItemBaseDeadline,
  ItemBaseCommentsButton,
} from "@/dashboard/common/ItemBase";

import { memo } from "react";
import { useModal } from "@/common/ModalManagerContext";
import { OverdueBadge } from "@/dashboard/common/OverdueBadge";
import { ListItemGate } from "@/dashboard/common/ListItemGate";
import { useDeadline } from "@/dashboard/common/DeadlineContext";
import { UserTaskListItemLayout } from "./UserTaskListItemLayout";
import { UserTaskListItemSkeleton } from "./UserTaskListItemSkeleton";
import { TaskItemActionMenuTrigger } from "@/dashboard/tasks/TaskItem";
import { SelectableTaskItem } from "@/dashboard/tasks/SelectableTaskItem";
import { TaskItemStatusBadge } from "@/dashboard/tasks/TaskItemStatusBadge";
import { TaskItemCheckbox } from "@/dashboard/tasks/TaskItem/TaskItemCheckbox";
import { ListItemText, ListItemTitleButton } from "@/dashboard/common/ListItem";

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

const UserTaskListItemInner = memo(function UserTaskListItemInner({
  id,
  isPending,
  title,
  status,
  commentsCount,
}: InnerProps) {
  const { onOpenChange: onTaskDetailModalOpenChange } = useModal("taskDetail");
  const { onOpenChange: onTaskCommentsModalOpenChange } =
    useModal("taskComments");

  const { overdue } = useDeadline();

  return (
    <UserTaskListItemLayout
      className={isPending ? "*:opacity-50" : undefined}
      checkboxSlot={<TaskItemCheckbox id={id} title={title} status={status} />}
      mainSlot={
        <>
          <ListItemTitleButton
            onPress={() => onTaskDetailModalOpenChange(true)}
          >
            {title}
          </ListItemTitleButton>

          {overdue ? (
            <OverdueBadge />
          ) : (
            <ListItemText>
              <ItemBaseDeadline />
            </ListItemText>
          )}
        </>
      }
      statusSlot={<TaskItemStatusBadge taskId={id} status={status} />}
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
