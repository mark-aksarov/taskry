"use client";

import {
  BaseTaskItemProps,
  TaskItemPendingOverlay,
} from "@/components/tasks/TaskItem";

import {
  ItemBaseDeadline,
  ItemBaseCommentsButton,
} from "@/components/common/ItemBase";

import { memo } from "react";
import { UserTaskListItemLayout } from "./UserTaskListItemLayout";
import { useModal } from "@/components/common/ModalManagerContext";
import { SelectableItem } from "@/components/common/SelectableItem";
import { TaskItemBaseBadge } from "@/components/tasks/TaskItemBaseBadge";
import { useSelectedTasks } from "@/components/tasks/SelectedTasksContext";
import { ListItemText, ListItemTitleButton } from "@/components/common/List";
import { TaskItemCheckbox } from "@/components/tasks/TaskItem/TaskItemCheckbox";
import { TaskItemActionMenuTrigger } from "@/components/tasks/TaskItem/TaskItemActionMenuTrigger";

export const UserTaskListItem = (props: BaseTaskItemProps) => {
  const selected = useSelectedTasks();

  return (
    <TaskItemPendingOverlay taskId={props.id}>
      <SelectableItem
        {...selected}
        item={{ id: props.id, status: props.status }}
      >
        <UserTaskListItemInner {...props} />
      </SelectableItem>
    </TaskItemPendingOverlay>
  );
};

export const UserTaskListItemInner = memo(function UserTaskListItemInner({
  id,
  title,
  deadline,
  status,
  commentsCount,
}: BaseTaskItemProps) {
  const { onOpenChange: onTaskDetailModalOpenChange } = useModal("taskDetail");
  const { onOpenChange: onTaskCommentsModalOpenChange } =
    useModal("taskComments");

  return (
    <UserTaskListItemLayout
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
        <TaskItemBaseBadge taskId={id} deadline={deadline} status={status} />
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
