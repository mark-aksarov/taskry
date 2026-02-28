"use client";

import {
  ActionFn,
  ActionState,
  DeleteTasksPayload,
  UpdateTaskStatusesPayload,
} from "@/lib/actions/types";

import {
  ListItemText,
  ListItemTitle,
  ListItemTitleDetailModalTrigger,
} from "@/components/common/List";

import { memo } from "react";
import { TaskStatus } from "@/generated/prisma/enums";
import { useFormatter, useTranslations } from "next-intl";
import { UserTaskListItemLayout } from "./UserTaskListItemLayout";
import { SelectableItem } from "@/components/common/SelectableItem";
import { TaskDetailModal } from "@/components/tasks/TaskDetailModal";
import { TaskItemCheckbox } from "@/components/tasks/TaskItemCheckbox";
import { TaskCommentsModal } from "@/components/tasks/TaskCommentsModal";
import { TaskItemBaseBadge } from "@/components/tasks/TaskItemBaseBadge";
import { DeleteTaskProvider } from "@/components/tasks/DeleteTaskContext";
import { useSelectedTasks } from "@/components/tasks/SelectedTasksContext";
import { ItemBaseCommentsModalTrigger } from "@/components/common/ItemBase";
import { TaskItemDeleteOverlay } from "@/components/tasks/TaskItemDeleteOverlay";
import { UpdateTaskStatusProvider } from "@/components/tasks/UpdateTaskStatusContext";
import { TaskItemActionMenuTrigger } from "@/components/tasks/TaskItemActionMenuTrigger";

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
  updateTaskStatus: ActionFn<ActionState, UpdateTaskStatusesPayload>;
  deleteTask: ActionFn<ActionState, DeleteTasksPayload>;
}

export const UserTaskListItem = ({
  updateTaskStatus,
  deleteTask,
  ...props
}: UserTaskListItemProps) => {
  const selected = useSelectedTasks();

  const isSelected = !!selected.get(props.id);

  return (
    <DeleteTaskProvider deleteTask={deleteTask}>
      <UpdateTaskStatusProvider updateStatus={updateTaskStatus}>
        <TaskItemDeleteOverlay>
          <SelectableItem
            {...selected}
            item={{ id: props.id, status: props.status }}
          >
            <UserTaskListItemInner {...props} isSelected={isSelected} />
          </SelectableItem>
        </TaskItemDeleteOverlay>
      </UpdateTaskStatusProvider>
    </DeleteTaskProvider>
  );
};

// `isSelected` is used in `TaskItemBaseBadge` because `useSelectedTasks` cannot be called inside it.
type UserTaskListItemInnerProps = Omit<
  UserTaskListItemProps,
  "updateTaskStatus" | "deleteTask"
> & {
  isSelected: boolean;
};

export const UserTaskListItemInner = memo(
  ({
    id,
    title,
    deadline,
    status,
    commentsCount,
    isSelected,
    taskDetailContainer,
    taskCommentsContainer,
    editTaskFormContainer,
    sendComment,
    updateComment,
  }: UserTaskListItemInnerProps) => {
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
            isSelected={isSelected}
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
            editTaskFormContainer={editTaskFormContainer}
          />
        }
      />
    );
  },
);
