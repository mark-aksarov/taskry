"use client";

import {
  ItemBaseDetailButton,
  ItemBaseCommentsButton,
  ItemBaseUserImageContainer,
} from "@/components/common/ItemBase";

import { memo } from "react";
import { BaseTaskItemProps } from "../TaskItem";
import { TaskItemBaseBadge } from "../TaskItemBaseBadge";
import { TaskGridItemLayout } from "./TaskGridItemLayout";
import { useSelectedTasks } from "../SelectedTasksContext";
import { TaskGridItemProgress } from "./TaskGridItemProgress";
import { ListItemTitleButton } from "@/components/common/List";
import { ItemBaseDeadline } from "@/components/common/ItemBase";
import { TaskItemCheckbox } from "../TaskItem/TaskItemCheckbox";
import { useModal } from "@/components/common/ModalManagerContext";
import { SelectableItem } from "@/components/common/SelectableItem";
import { GridItemInfo, GridItemText } from "@/components/common/Grid";
import { TaskItemActionMenuTrigger, TaskItemPendingOverlay } from "../TaskItem";

interface Props extends BaseTaskItemProps {
  subtasksTotal: number;
  subtasksDone: number;
}

export function TaskGridItemLarge(props: Props) {
  const selected = useSelectedTasks();

  return (
    <TaskItemPendingOverlay taskId={props.id}>
      <SelectableItem
        {...selected}
        item={{ id: props.id, status: props.status }}
      >
        <TaskGridItemLargeInner {...props} />
      </SelectableItem>
    </TaskItemPendingOverlay>
  );
}

export const TaskGridItemLargeInner = memo(function TaskGridItemLargeInner({
  id,
  title,
  deadline,
  assignee,
  commentsCount,
  status,
  subtasksTotal,
  subtasksDone,
}: Props) {
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
