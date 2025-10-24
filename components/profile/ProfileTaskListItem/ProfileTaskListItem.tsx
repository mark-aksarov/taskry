"use client";

import { useMemo } from "react";
import { Item } from "react-stately";
import {
  Check,
  CircleEllipsis,
  Clock,
  Ellipsis,
  ListTodo,
  MessagesSquare,
  Trash,
} from "lucide-react";

import { Badge, Button, Checkbox, Skeleton } from "@/components/ui";

import {
  ListItem,
  ListItemInfo,
  ListItemInfoSkeleton,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import { TaskPreview } from "@/lib/queries/types";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";
import { Link } from "@/components/ui";
import { MenuTriggerSkeleton } from "@/components/common/MenuTriggerSkeleton";
import { MenuDialogHeader } from "@/components/common/MenuDialogHeader";

export const ProfileTaskListItem = ({ task }: { task?: TaskPreview }) => {
  const locale = "en-GB";

  const formattedDeadline = useMemo(() => {
    if (!task?.deadline) return "";
    return new Date(task.deadline).toLocaleDateString(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, [task?.deadline, locale]);

  return (
    <ListItem className="border-gray-300 md:rounded-none md:pr-4 md:pl-6 md:shadow-none md:not-last:border-b-1 dark:border-gray-600">
      {task && <Checkbox aria-label="task checkbox" />}

      {/* --- Task Details --- */}
      {!task ? (
        <ListItemInfoSkeleton />
      ) : (
        <ListItemInfo>
          <ListItemTitle>
            <Link href={`/tasks/${task.id}`}>{task.title}</Link>
          </ListItemTitle>

          <ListItemText>{`Deadline on ${formattedDeadline}`}</ListItemText>
        </ListItemInfo>
      )}

      <div className="flex items-center gap-2">
        {/* --- Comments --- */}
        {!task ? (
          <Skeleton className="w-[3.5rem] @max-md:hidden" />
        ) : (
          <Badge color="gray" className="px-3 py-1.5 @max-md:hidden">
            <MessagesSquare size={16} strokeWidth={1.5} absoluteStrokeWidth />
            {task._count.comments}
          </Badge>
        )}

        <div className="flex items-center gap-1">
          {/* --- Subtasks --- */}
          {!task ? (
            <Skeleton className="w-[3.5rem] @max-md:hidden" />
          ) : (
            <Badge color="gray" className="px-3 py-1.5 @max-md:hidden">
              <ListTodo size={16} strokeWidth={1.5} absoluteStrokeWidth />
              {task._count.subtasks}
            </Badge>
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
