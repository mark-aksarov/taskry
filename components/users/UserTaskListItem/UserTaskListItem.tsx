"use client";

import {
  ActionFn,
  ActionState,
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
import { useSelectedTasks } from "@/components/tasks/SelectedTasksContext";
import { ItemBaseCommentsModalTrigger } from "@/components/common/ItemBase";
import { UpdateTaskStatusProvider } from "@/components/tasks/UpdateTaskStatusContext";
import { TaskItemActionMenuTrigger } from "@/components/tasks/TaskItemActionMenuTrigger";

export interface UserTaskListItemProps {
  id: number;
  title: string;
  deadline: string;
  status: TaskStatus;
  commentsCount: number;
  guestMode: boolean;
  taskDetailContainer: React.ReactNode;
  taskCommentsContainer: React.ReactNode;
  editTaskFormContainer: React.ReactNode;
  sendComment: ActionFn<ActionState, FormData>;
  updateComment: ActionFn<ActionState, FormData>;
  updateTaskStatus: ActionFn<ActionState, UpdateTaskStatusesPayload>;
}

export const UserTaskListItem = ({
  updateTaskStatus,
  ...props
}: UserTaskListItemProps) => {
  const selected = useSelectedTasks();

  const isSelected = !!selected.get(props.id);

  return (
    <UpdateTaskStatusProvider updateStatus={updateTaskStatus}>
      <SelectableItem
        {...selected}
        item={{ id: props.id, status: props.status }}
      >
        <UserTaskListItemInner {...props} isSelected={isSelected} />
      </SelectableItem>
    </UpdateTaskStatusProvider>
  );
};

// `isSelected` is used in `TaskItemBaseBadge` because `useSelectedTasks` cannot be called inside it.
type UserTaskListItemInnerProps = Omit<
  UserTaskListItemProps,
  "updateTaskStatus"
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
    guestMode,
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
          <TaskItemBaseBadge isSelected={isSelected} status={status} />
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
            guestMode={guestMode}
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
