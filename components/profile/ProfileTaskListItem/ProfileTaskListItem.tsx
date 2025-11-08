"use client";

import { useMemo } from "react";
import { Item } from "react-stately";
import {
  Check,
  CircleEllipsis,
  Clock,
  Ellipsis,
  ListTodo,
  Trash,
} from "lucide-react";

import { Button, Checkbox, Skeleton } from "@/components/ui";

import {
  ListItem,
  ListItemInfo,
  ListItemInfoSkeleton,
  ListItemText,
} from "@/components/common/List";

import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";
import { MenuTriggerSkeleton } from "@/components/common/MenuTriggerSkeleton";
import { MenuDialogHeader } from "@/components/common/MenuDialogHeader";
import { TaskListItemTitle } from "@/components/tasks/TaskListItem";
import { TaskCommentsModalTrigger } from "@/components/tasks/TaskCommentsModalTrigger";

export interface ProfileTaskListItemType {
  id: number;
  title: string;
  deadline?: Date | null;
  _count: {
    comments: number;
    subtasks: number;
  };
  subtasks?: { isDone: boolean }[];
}

export interface ProfileTaskListItemProps {
  task?: ProfileTaskListItemType;
}

export const ProfileTaskListItem = ({ task }: ProfileTaskListItemProps) => {
  const locale = "en-GB";

  const formattedDeadline = useMemo(() => {
    if (!task?.deadline) return "";
    return new Date(task.deadline).toLocaleDateString(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, [task?.deadline, locale]);

  const buttonStyles = "w-[3.75rem] justify-center rounded-full @max-md:hidden";

  return (
    <ListItem className="border-gray-300 md:rounded-none md:px-0 md:py-4 md:shadow-none md:not-last:border-b-1 dark:border-gray-600">
      {task && <Checkbox aria-label="task checkbox" />}

      {/* --- Task Details --- */}
      {!task ? (
        <ListItemInfoSkeleton />
      ) : (
        <ListItemInfo>
          <TaskListItemTitle task={task} />
          <ListItemText>{`Deadline on ${formattedDeadline}`}</ListItemText>
        </ListItemInfo>
      )}

      <div className="flex items-center gap-2">
        {/* --- Comments --- */}
        {!task ? (
          <Skeleton className="h-8 w-[3.75rem]" />
        ) : (
          <TaskCommentsModalTrigger
            commentCount={task._count.comments}
            taskId={task.id}
          />
        )}

        <div className="flex items-center gap-1">
          {/* --- Subtasks --- */}
          {!task ? (
            <Skeleton className="h-[2rem] w-[3.75rem] @max-md:hidden" />
          ) : (
            <Button
              variant="outlined"
              iconLeft={
                <ListTodo size={16} strokeWidth={1.5} absoluteStrokeWidth />
              }
              label={task._count.subtasks}
              className={buttonStyles}
            />
          )}

          {/* --- Menu --- */}
          {!task ? (
            <MenuTriggerSkeleton />
          ) : (
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
          )}
        </div>
      </div>
    </ListItem>
  );
};
