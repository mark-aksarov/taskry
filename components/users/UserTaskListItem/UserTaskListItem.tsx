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

import { Link } from "@/components/ui/Link";
import { TaskStatus } from "@/generated/prisma/enums";
import { useFormatter, useTranslations } from "next-intl";
import { UserTaskListItemLayout } from "./UserTaskListItemLayout";
import { TaskItemCheckbox } from "@/components/tasks/TaskItemCheckbox";
import { TaskItemBaseBadge } from "@/components/tasks/TaskItemBaseBadge";
import { ItemBaseDetailModalTrigger } from "@/components/common/ItemBase";
import { UpdateTaskStatusProvider } from "@/components/tasks/UpdateTaskStatusContext";
import { TaskCommentsModalTrigger } from "@/components/tasks/TaskCommentsModalTrigger";

export interface UserTaskListItemProps {
  id: number;
  title: string;
  deadline: Date;
  status: TaskStatus;
  commentsCount: number;
  taskCommentsModal: React.ReactNode;
  menuTrigger: React.ReactNode;
  taskDetailModal: React.ReactNode;
  updateTaskStatus: ActionFn<ActionState, UpdateTaskStatusesPayload>;
}

export const UserTaskListItem = ({
  updateTaskStatus,
  ...props
}: UserTaskListItemProps) => {
  return (
    <UpdateTaskStatusProvider updateTaskStatus={updateTaskStatus}>
      <UserTaskListItemInner {...props} />
    </UpdateTaskStatusProvider>
  );
};

export const UserTaskListItemInner = ({
  id,
  title,
  deadline,
  status,
  commentsCount,
  taskCommentsModal,
  menuTrigger,
  taskDetailModal,
}: Omit<UserTaskListItemProps, "updateTaskStatus">) => {
  const t = useTranslations("users.UserTaskListItem");

  const format = useFormatter();

  const deadlineOn = t("deadlineOn", {
    date: format.dateTime(deadline, {
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
              modal={taskDetailModal}
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
        <TaskCommentsModalTrigger
          commentsCount={commentsCount}
          modal={taskCommentsModal}
        />
      }
      actionMenuSlot={menuTrigger}
    />
  );
};
