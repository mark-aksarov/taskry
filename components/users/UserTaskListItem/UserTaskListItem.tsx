"use client";

import {
  ActionFn,
  ActionState,
  DeleteProjectsPayload,
} from "@/lib/actions/types";

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
import { useFormatter, useTranslations } from "next-intl";
import { Checkbox, RACDialogTrigger } from "@/components/ui";
import { UserTaskListItemLayout } from "./UserTaskListItemLayout";
import { TaskDetailModal } from "@/components/tasks/TaskDetailModal";
import { TaskCommentsModal } from "@/components/tasks/TaskCommentsModal";
import { useTasksSelection } from "@/components/tasks/TasksSelectionContext";
import { TaskDetailBottomSheet } from "@/components/tasks/TaskDetailBottomSheet";
import { getTaskStatusBadgeColor } from "@/components/tasks/getTaskStatusBadgeColor";
import { TaskItemActionMenuTrigger } from "@/components/tasks/TaskItemActionMenuTrigger";

export interface UserTaskListItemProps {
  id: number;
  title: string;
  deadline?: Date;
  status: string;
  commentsCount: number;
  deleteAction: ActionFn<ActionState, DeleteProjectsPayload>;
}

export const UserTaskListItem = ({
  id,
  title,
  deadline,
  status,
  commentsCount,
  deleteAction,
}: UserTaskListItemProps) => {
  const t = useTranslations();
  const { selectedIds, toggleSelection } = useTasksSelection();

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

  const isSelected = !!selectedIds[id];

  return (
    <UserTaskListItemLayout
      checkboxSlot={
        <Checkbox
          aria-label={t("users.UserTaskListItem.checkboxAriaLabel")}
          isSelected={isSelected}
          onChange={() => toggleSelection(id)}
        />
      }
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
      actionMenuSlot={
        <TaskItemActionMenuTrigger
          taskId={id}
          taskTitle={title}
          deleteAction={deleteAction}
        />
      }
    />
  );
};
