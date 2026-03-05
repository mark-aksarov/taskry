"use client";

import {
  ActionFn,
  ActionState,
  DeleteTaskPayload,
  UpdateTaskStatusPayload,
} from "@/lib/actions/types";

import {
  ListItemText,
  ListItemTitle,
  ListItemTitleDetailModalTrigger,
} from "@/components/common/List";

import { memo } from "react";
import { TaskStatus } from "@/generated/prisma/enums";
import { useFormatter, useTranslations } from "next-intl";
import { EditTaskModal } from "@/components/tasks/EditTaskModal";
import { UserTaskListItemLayout } from "./UserTaskListItemLayout";
import { SelectableItem } from "@/components/common/SelectableItem";
import { TaskDetailModal } from "@/components/tasks/TaskDetailModal";
import { TaskItemPendingOverlay } from "@/components/tasks/TaskItem";
import { TaskCommentsModal } from "@/components/tasks/TaskCommentsModal";
import { TaskItemBaseBadge } from "@/components/tasks/TaskItemBaseBadge";
import { UpdateTaskProvider } from "@/components/tasks/UpdateTaskContext";
import { DeleteTaskProvider } from "@/components/tasks/DeleteTaskContext";
import { useSelectedTasks } from "@/components/tasks/SelectedTasksContext";
import { ItemBaseCommentsModalTrigger } from "@/components/common/ItemBase";
import { TaskItemCheckbox } from "@/components/tasks/TaskItem/TaskItemCheckbox";
import { UpdateTaskStatusProvider } from "@/components/tasks/UpdateTaskStatusContext";
import { TaskItemActionMenuTrigger } from "@/components/tasks/TaskItem/TaskItemActionMenuTrigger";

export interface UserTaskListItemProps {
  id: number;
  title: string;
  deadline: string;
  status: TaskStatus;
  commentsCount: number;
  taskDetailContainer: React.ReactNode;
  taskCommentsContainer: React.ReactNode;
  editTaskFormContainer: React.ReactNode;
  sendComment: ActionFn<ActionState, FormData>;
  updateComment: ActionFn<ActionState, FormData>;
  updateTask: ActionFn<ActionState, FormData>;
  deleteTask: ActionFn<ActionState, DeleteTaskPayload>;
  updateTaskStatus: ActionFn<ActionState, UpdateTaskStatusPayload>;
}

export const UserTaskListItem = ({
  updateTask,
  deleteTask,
  updateTaskStatus,
  ...props
}: UserTaskListItemProps) => {
  const selected = useSelectedTasks();

  return (
    <DeleteTaskProvider deleteTask={deleteTask}>
      <UpdateTaskProvider taskId={props.id} updateTask={updateTask}>
        <UpdateTaskStatusProvider updateTaskStatus={updateTaskStatus}>
          <TaskItemPendingOverlay taskId={props.id}>
            <SelectableItem
              {...selected}
              item={{ id: props.id, status: props.status }}
            >
              <UserTaskListItemInner {...props} />
            </SelectableItem>
          </TaskItemPendingOverlay>
        </UpdateTaskStatusProvider>
      </UpdateTaskProvider>
    </DeleteTaskProvider>
  );
};

export const UserTaskListItemInner = memo(
  ({
    id,
    title,
    deadline,
    status,
    commentsCount,
    taskDetailContainer,
    taskCommentsContainer,
    editTaskFormContainer,
    sendComment,
    updateComment,
  }: Omit<
    UserTaskListItemProps,
    "updateTask" | "deleteTask" | "updateTaskStatus"
  >) => {
    const t = useTranslations("users.UserTaskListItem");

    // use useFormatter to format the date according to the user's locale
    const format = useFormatter();

    const deadlineOn = t("deadlineOn", {
      date: format.dateTime(new Date(deadline), {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    });

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
              <ListItemText>{deadlineOn}</ListItemText>
            </>
          }
          mainMobileSlot={
            <>
              <ListItemTitle>{title}</ListItemTitle>
              <ListItemText>{deadlineOn}</ListItemText>
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
        <EditTaskModal editTaskFormContainer={editTaskFormContainer} />
      </>
    );
  },
);
