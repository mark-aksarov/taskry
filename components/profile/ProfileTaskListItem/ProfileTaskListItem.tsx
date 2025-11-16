"use client";

import { Check, CircleEllipsis, Clock, ListTodo, Trash } from "lucide-react";
import { useMemo } from "react";
import { Item } from "react-stately";
import { Button, Checkbox } from "@/components/ui";
import { ProfileTaskListItemLayout } from "./ProfileTaskListItemLayout";
import {
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";
import { TaskCommentsModalTrigger } from "@/components/tasks/TaskCommentsModalTrigger";
import { TaskDetailModal } from "@/components/tasks/TaskDetailModal";
import { TaskDetailBottomSheet } from "@/components/tasks/TaskDetailBottomSheet";
import {
  ItemBaseActionMenuTrigger,
  ItemBaseBadge,
  ItemBaseDetailBottomSheetTrigger,
  ItemBaseDetailModalTrigger,
} from "@/components/common/ItemBase";
import { getTaskStatusBadgeColor } from "@/components/tasks/getTaskStatusBadgeColor";

export interface ProfileTaskListItemProps {
  id: number;
  title: string;
  deadline?: Date;
  status: {
    id: string;
    name: string;
  };
  comments: number;
  subtasks: number;
}

export const ProfileTaskListItem = ({
  id,
  title,
  deadline,
  status,
  comments,
  subtasks,
}: ProfileTaskListItemProps) => {
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
    <ProfileTaskListItemLayout
      checkboxSlot={<Checkbox aria-label="task checkbox" />}
      deadlineSlot={
        <ListItemInfo>
          <ListItemTitle>
            <ItemBaseDetailModalTrigger
              title={title}
              modal={<TaskDetailModal taskId={id} />}
            />
            <ItemBaseDetailBottomSheetTrigger
              title={title}
              renderBottomSheet={(state) => (
                <TaskDetailBottomSheet taskId={id} state={state} />
              )}
            />
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
        <TaskCommentsModalTrigger commentCount={comments} taskId={id} />
      }
      subtasksSlot={
        <Button
          variant="outlined"
          iconLeft={
            <ListTodo size={16} strokeWidth={1.5} absoluteStrokeWidth />
          }
          label={subtasks}
          className="h-[1.75rem] w-[3.75rem] justify-center rounded-full @max-md:hidden"
        />
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
