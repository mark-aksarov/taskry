"use client";

import {
  Check,
  CircleEllipsis,
  Clock,
  Ellipsis,
  ListTodo,
  Trash,
} from "lucide-react";
import { useMemo } from "react";
import { Item } from "react-stately";
import { Button, Checkbox } from "@/components/ui";
import { TaskListItemTitle } from "@/components/tasks/TaskListItem";
import { ListItemInfo, ListItemText } from "@/components/common/List";
import { ProfileTaskListItemLayout } from "./ProfileTaskListItemLayout";
import { MenuDialogHeader } from "@/components/common/MenuDialogHeader";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";
import { TaskCommentsModalTrigger } from "@/components/tasks/TaskCommentsModalTrigger";
import { TaskStatusBadge } from "@/components/tasks/TaskStatusBadge";

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
          <TaskListItemTitle id={id} title={title} />
          <ListItemText>{`Deadline on ${formattedDeadline}`}</ListItemText>
        </ListItemInfo>
      }
      statusSlot={
        <TaskStatusBadge status={status} className="@max-lg:hidden" />
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
        <ResponsiveMenuTrigger
          placement="bottom right"
          renderDialogHeader={() => <MenuDialogHeader heading="Actions" />}
          renderButton={() => (
            <Button
              aria-label="task menu"
              variant="ghost"
              iconLeft={
                <Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
              }
              className="rounded-full"
            />
          )}
        >
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
        </ResponsiveMenuTrigger>
      }
    />
  );
};
