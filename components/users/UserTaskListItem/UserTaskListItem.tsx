"use client";

import {
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import {
  ItemBaseBadge,
  ItemBaseButton,
  ItemBaseDetailModalTrigger,
  ItemBaseDetailBottomSheetTrigger,
} from "@/components/common/ItemBase";

import { MessageSquare } from "lucide-react";
import { RACDialogTrigger } from "@/components/ui";
import { useFormatter, useTranslations } from "next-intl";
import { UserTaskListItemLayout } from "./UserTaskListItemLayout";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";
import { TaskDetailModal } from "@/components/tasks/TaskDetailModal";
import { useSyncSelectionTaskItem } from "@/lib/hooks/useTaskSelection";
import { TaskCommentsModal } from "@/components/tasks/TaskCommentsModal";
import { TaskDetailBottomSheet } from "@/components/tasks/TaskDetailBottomSheet";
import { getTaskStatusBadgeColor } from "@/components/tasks/getTaskStatusBadgeColor";
import { TaskListItemCheckbox } from "@/components/tasks/TaskListItem/TaskListItemCheckbox";

export interface UserTaskListItemProps {
  id: number;
  title: string;
  deadline?: Date;
  status: TaskStatus;
  projectStatus: ProjectStatus;
  commentsCount: number;
  menuTrigger?: React.ReactNode;
}

export const UserTaskListItem = ({
  id,
  title,
  deadline,
  status,
  projectStatus,
  commentsCount,
  menuTrigger,
}: UserTaskListItemProps) => {
  const t = useTranslations();

  useSyncSelectionTaskItem(id, title, status, projectStatus);

  const format = useFormatter();

  const deadlineOn = deadline
    ? t("users.UserTaskListItem.deadlineOn", {
        date: format.dateTime(deadline, {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      })
    : t("users.UserTaskListItem.noDeadline");

  return (
    <UserTaskListItemLayout
      checkboxSlot={<TaskListItemCheckbox id={id} />}
      deadlineSlot={
        <ListItemInfo>
          <ListItemTitle>
            <ItemBaseDetailModalTrigger
              modal={<TaskDetailModal taskId={id} />}
              className="truncate"
            >
              {title}
            </ItemBaseDetailModalTrigger>

            <ItemBaseDetailBottomSheetTrigger
              renderBottomSheet={(state) => (
                <TaskDetailBottomSheet taskId={id} state={state} />
              )}
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
          {t(`tasks.TaskStatus.${status}`)}
        </ItemBaseBadge>
      }
      commentsSlot={
        <RACDialogTrigger>
          <ItemBaseButton
            label={commentsCount}
            iconLeft={
              <MessageSquare size={16} strokeWidth={1.5} absoluteStrokeWidth />
            }
          />
          <TaskCommentsModal taskId={id} />
        </RACDialogTrigger>
      }
      actionMenuSlot={menuTrigger}
    />
  );
};
