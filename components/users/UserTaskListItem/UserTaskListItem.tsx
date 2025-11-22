"use client";

import {
  Check,
  CircleEllipsis,
  Clock,
  MessageSquare,
  Trash,
} from "lucide-react";
import { useMemo } from "react";
import { Item } from "react-stately";
import { Checkbox, RACDialogTrigger } from "@/components/ui";
import { UserTaskListItemLayout } from "./UserTaskListItemLayout";
import {
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";
import { TaskCommentsModal } from "@/components/tasks/TaskCommentsModal";
import { TaskDetailModal } from "@/components/tasks/TaskDetailModal";
import { TaskDetailBottomSheet } from "@/components/tasks/TaskDetailBottomSheet";
import {
  ItemBaseActionMenuTrigger,
  ItemBaseBadge,
  ItemBaseButton,
  ItemBaseDetailBottomSheetTrigger,
  ItemBaseDetailModalTrigger,
} from "@/components/common/ItemBase";
import { getTaskStatusBadgeColor } from "@/components/tasks/getTaskStatusBadgeColor";

export interface UserTaskListItemProps {
  id: number;
  title: string;
  deadline?: Date;
  status: {
    id: string;
    name: string;
  };
  comments: number;
}

export const UserTaskListItem = ({
  id,
  title,
  deadline,
  status,
  comments,
}: UserTaskListItemProps) => {
  const locale = "en-GB";

  const formattedDeadline = useMemo(() => {
    if (!deadline) return "";
    return new Date(deadline).toLocaleDateString(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, [deadline, locale]);

  return (
    <UserTaskListItemLayout
      checkboxSlot={<Checkbox aria-label="task checkbox" />}
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
          <ListItemText>{`Deadline on ${formattedDeadline}`}</ListItemText>
        </ListItemInfo>
      }
      statusSlot={
        <ItemBaseBadge
          color={getTaskStatusBadgeColor(status.id)}
          className="@max-lg:hidden"
        >
          {status.name}
        </ItemBaseBadge>
      }
      commentsSlot={
        <RACDialogTrigger>
          <ItemBaseButton
            label={comments}
            iconLeft={
              <MessageSquare size={16} strokeWidth={1.5} absoluteStrokeWidth />
            }
          />
          <TaskCommentsModal taskId={id} />
        </RACDialogTrigger>
      }
      actionMenuSlot={
        <ItemBaseActionMenuTrigger>
          <Item textValue="Delete" key="delete">
            <Trash size={16} /> Delete
          </Item>
          <Item textValue="Mark as Pending" key="pending">
            <CircleEllipsis size={16} /> Mark as Pending
          </Item>
          <Item textValue="Mark as Done" key="done">
            <Check size={16} />
            Mark as Done
          </Item>
          <Item textValue="Mark as Active" key="active">
            <Clock size={16} />
            Mark as Active
          </Item>
        </ItemBaseActionMenuTrigger>
      }
    />
  );
};
