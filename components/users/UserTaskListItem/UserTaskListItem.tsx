"use client";

import {
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import {
  ActionFn,
  ActionState,
  UpdateTaskStatusesPayload,
} from "@/lib/actions/types";

import {
  ItemBaseDetailModalTrigger,
  ItemBaseCommentsModalTrigger,
} from "@/components/common/ItemBase";

import { Link } from "@/components/ui/Link";
import { TaskStatus } from "@/generated/prisma/enums";
import { useFormatter, useTranslations } from "next-intl";
import { UserTaskListItemLayout } from "./UserTaskListItemLayout";
import { SelectableItem } from "@/components/common/SelectableItem";
import { TaskItemCheckbox } from "@/components/tasks/TaskItemCheckbox";
import { TaskItemBaseBadge } from "@/components/tasks/TaskItemBaseBadge";
import { useSelectedTasks } from "@/components/tasks/SelectedTasksContext";
import { UpdateTaskStatusProvider } from "@/components/tasks/UpdateTaskStatusContext";
import { TaskDetailModal } from "@/components/tasks/TaskDetailModal";
import { TaskCommentsModal } from "@/components/tasks/TaskCommentsModal";
import { TaskItemActionMenuTrigger } from "@/components/tasks/TaskItemActionMenuTrigger";
import { memo } from "react";

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

  return (
    <UpdateTaskStatusProvider updateStatus={updateTaskStatus}>
      <SelectableItem
        {...selected}
        item={{ id: props.id, status: props.status }}
      >
        <UserTaskListItemInner {...props} />
      </SelectableItem>
    </UpdateTaskStatusProvider>
  );
};

export const UserTaskListItemInner = memo(
  ({
    id,
    title,
    deadline,
    status,
    commentsCount,
    guestMode,
    taskDetailContainer,
    taskCommentsContainer,
    editTaskFormContainer,
    sendComment,
    updateComment,
  }: Omit<UserTaskListItemProps, "updateTaskStatus">) => {
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
        deadlineSlot={
          <ListItemInfo>
            <ListItemTitle>
              <ItemBaseDetailModalTrigger
                modal={
                  <TaskDetailModal
                    taskId={id}
                    taskDetailContainer={taskDetailContainer}
                  />
                }
                className="truncate max-md:hidden"
              >
                {title}
              </ItemBaseDetailModalTrigger>

              <Link className="block truncate md:hidden" href={`/tasks/${id}`}>
                {title}
              </Link>
            </ListItemTitle>
            <ListItemText>{deadlineOn}</ListItemText>
          </ListItemInfo>
        }
        statusSlot={
          <TaskItemBaseBadge
            taskId={id}
            status={status}
            className="@max-lg:hidden"
          />
        }
        commentsSlot={
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
        actionMenuSlot={
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
