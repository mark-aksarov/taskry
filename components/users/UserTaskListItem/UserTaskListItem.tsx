"use client";

import {
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import {
  ItemBaseBadge,
  ItemBaseDetailModalTrigger,
  ItemBaseDetailBottomSheetTrigger,
} from "@/components/common/ItemBase";

import { TaskStatus } from "@/generated/prisma/enums";
import { useFormatter, useTranslations } from "next-intl";
import { UserTaskListItemLayout } from "./UserTaskListItemLayout";
import { useSyncSelectionTaskItem } from "@/lib/hooks/useTaskSelection";
import { getTaskStatusBadgeColor } from "@/components/tasks/getTaskStatusBadgeColor";
import { TaskListItemCheckbox } from "@/components/tasks/TaskListItem/TaskListItemCheckbox";

export interface UserTaskListItemProps {
  id: number;
  title: string;
  deadline?: Date;
  status: TaskStatus;
  commentModalTrigger?: React.ReactNode;
  menuTrigger: React.ReactNode;
  taskDetailModal: React.ReactNode;
  taskDetailBottomSheet: React.ReactNode;
}

export const UserTaskListItem = ({
  id,
  title,
  deadline,
  status,
  commentModalTrigger,
  menuTrigger,
  taskDetailModal,
  taskDetailBottomSheet,
}: UserTaskListItemProps) => {
  const t = useTranslations("users.UserTaskListItem");
  const tStatus = useTranslations("tasks.TaskStatus");

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

            <ItemBaseDetailBottomSheetTrigger
              bottomSheet={taskDetailBottomSheet}
              className="truncate"
            >
              {title}
            </ItemBaseDetailBottomSheetTrigger>
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
      commentsSlot={commentModalTrigger}
      actionMenuSlot={menuTrigger}
    />
  );
};
