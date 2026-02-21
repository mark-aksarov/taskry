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

export interface UserTaskListItemProps {
  id: number;
  title: string;
  deadline: string;
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
        <ItemBaseCommentsModalTrigger
          commentsCount={commentsCount}
          modal={taskCommentsModal}
        />
      }
      actionMenuSlot={menuTrigger}
    />
  );
};
