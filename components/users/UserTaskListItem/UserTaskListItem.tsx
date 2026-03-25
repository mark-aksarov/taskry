"use client";

import {
  ListItemText,
  ListItemTitleDetailModalTrigger,
} from "@/components/common/List";

import {
  BaseTaskItemProps,
  TaskItemProviders,
} from "@/components/tasks/TaskItem";

import {
  ItemBaseDeadline,
  ItemBaseCommentsModalTrigger,
} from "@/components/common/ItemBase";

import { memo } from "react";
import { UpdateTaskModal } from "@/components/tasks/UpdateTaskModal";
import { UserTaskListItemLayout } from "./UserTaskListItemLayout";
import { SelectableItem } from "@/components/common/SelectableItem";
import { TaskDetailModal } from "@/components/tasks/TaskDetailModal";
import { TaskCommentsModal } from "@/components/tasks/TaskCommentsModal";
import { TaskItemBaseBadge } from "@/components/tasks/TaskItemBaseBadge";
import { useSelectedTasks } from "@/components/tasks/SelectedTasksContext";
import { TaskItemCheckbox } from "@/components/tasks/TaskItem/TaskItemCheckbox";
import { TaskItemActionMenuTrigger } from "@/components/tasks/TaskItem/TaskItemActionMenuTrigger";

interface Props extends BaseTaskItemProps {
  taskDetailContainer: React.ReactNode;
}

export const UserTaskListItem = ({
  updateTask,
  deleteTask,
  updateTaskStatus,
  ...props
}: Props) => {
  const selected = useSelectedTasks();

  return (
    <TaskItemProviders
      taskId={props.id}
      deleteTask={deleteTask}
      updateTask={updateTask}
      updateTaskStatus={updateTaskStatus}
    >
      <SelectableItem
        {...selected}
        item={{ id: props.id, status: props.status }}
      >
        <UserTaskListItemInner {...props} />
      </SelectableItem>
    </TaskItemProviders>
  );
};

type InnerProps = Omit<Props, "updateTask" | "deleteTask" | "updateTaskStatus">;

export const UserTaskListItemInner = memo(
  ({
    id,
    title,
    deadline,
    status,
    commentsCount,
    taskDetailContainer,
    taskCommentsContainer,
    updateTaskFormContainer,
    sendComment,
    updateComment,
  }: InnerProps) => {
    return (
      <>
        <UserTaskListItemLayout
          checkboxSlot={<TaskItemCheckbox id={id} status={status} />}
          mainSlot={
            <>
              <ListItemTitleDetailModalTrigger
                modal={
                  <TaskDetailModal
                    taskId={id}
                    taskDetailContainer={taskDetailContainer}
                  />
                }
              >
                {title}
              </ListItemTitleDetailModalTrigger>
              <ListItemText>
                <ItemBaseDeadline deadline={deadline} />
              </ListItemText>
            </>
          }
          statusSlot={
            <TaskItemBaseBadge
              taskId={id}
              deadline={deadline}
              status={status}
            />
          }
          commentsModalTriggerSlot={
            <ItemBaseCommentsModalTrigger
              commentsCount={commentsCount}
              modal={
                <TaskCommentsModal
                  taskId={id}
                  taskCommentsContainer={taskCommentsContainer}
                  sendComment={sendComment}
                  updateComment={updateComment}
                />
              }
            />
          }
          menuTriggerSlot={
            <TaskItemActionMenuTrigger
              taskId={id}
              taskTitle={title}
              taskStatus={status}
            />
          }
        />

        {/* Modal for editing task details */}
        <UpdateTaskModal updateTaskFormContainer={updateTaskFormContainer} />
      </>
    );
  },
);
