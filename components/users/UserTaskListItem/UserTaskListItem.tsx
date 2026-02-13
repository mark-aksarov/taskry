"use client";

import {
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import {
  ItemBaseBadge,
  ItemBaseDetailModalTrigger,
} from "@/components/common/ItemBase";

import { Link } from "@/components/ui/Link";
import { TaskStatus } from "@/generated/prisma/enums";
import { useFormatter, useTranslations } from "next-intl";
import { UserTaskListItemLayout } from "./UserTaskListItemLayout";
import { useSyncSelectionTaskItem } from "@/lib/hooks/useTaskSelection";
import { getTaskStatusBadgeColor } from "@/components/tasks/getTaskStatusBadgeColor";
import { TaskCommentsModalTrigger } from "@/components/tasks/TaskCommentsModalTrigger";
import { TaskListItemCheckbox } from "@/components/tasks/TaskListItem/TaskListItemCheckbox";

export interface UserTaskListItemProps {
  id: number;
  title: string;
  deadline?: Date;
  status: TaskStatus;
  commentsCount: number;
  taskCommentsModal: React.ReactNode;
  menuTrigger: React.ReactNode;
  taskDetailModal: React.ReactNode;
}

export const UserTaskListItem = ({
  id,
  title,
  deadline,
  status,
  commentsCount,
  taskCommentsModal,
  menuTrigger,
  taskDetailModal,
}: UserTaskListItemProps) => {
  const tStatus = useTranslations("tasks.TaskStatus");
  const t = useTranslations("users.UserTaskListItem");

  useSyncSelectionTaskItem(id, title, status);

  const format = useFormatter();

  const deadlineOn = deadline
    ? t("deadlineOn", {
        date: format.dateTime(deadline, {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      })
    : t("noDeadline");

  return (
    <UserTaskListItemLayout
      checkboxSlot={<TaskListItemCheckbox id={id} />}
      deadlineSlot={
        <ListItemInfo>
          <ListItemTitle>
            <ItemBaseDetailModalTrigger
              modal={taskDetailModal}
              className="truncate"
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
        <ItemBaseBadge
          color={getTaskStatusBadgeColor(status)}
          className="@max-lg:hidden"
        >
          {tStatus(`${status}`)}
        </ItemBaseBadge>
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
