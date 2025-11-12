"use client";

import Image from "next/image";
import { useMemo } from "react";
import { Item } from "react-stately";
import { Check, CircleEllipsis, Clock, Ellipsis, Trash } from "lucide-react";

import { Button, Checkbox, Link } from "@/components/ui";

import {
  ListItem,
  ListItemInfo,
  ListItemText,
  ListItemTitle,
  ListItemProgress,
} from "@/components/common/List";

import { ImageContainer } from "@/components/common/ImageContainer";

import { TaskListItemTitle } from "./TaskListItemTitle";
import { MenuDialogHeader } from "@/components/common/MenuDialogHeader";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";

interface TaskListItemProps {
  id: number;
  title: string;
  deadline?: Date;

  totalSubtasks?: number;
  subtasksDone?: number;

  assignee?: {
    id: string;
    imageUrl?: string;
    fullName: string;
  };
  category: {
    id: number;
    name: string;
  };
  project: {
    id: number;
    title: string;
  };
  status: {
    id: number;
    name: string;
  };
  commentsCount: number;
  subtasksCount: number;
  showSkeleton?: boolean;
  showCheckbox?: boolean;
}

export const TaskListItem = ({
  id,
  title,
  deadline,
  totalSubtasks,
  subtasksDone,
  assignee,
  category,
  project,
  status,
  commentsCount,
  subtasksCount,
  showCheckbox,
}: TaskListItemProps) => {
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
    <ListItem>
      {showCheckbox && <Checkbox aria-label="task checkbox" />}

      <ListItemInfo>
        <TaskListItemTitle id={id} title={title} />
        <ListItemText>{`Deadline on ${formattedDeadline}`}</ListItemText>
      </ListItemInfo>

      <ListItemInfo className="@max-3xl:hidden">
        <ListItemTitle>Category</ListItemTitle>

        <ListItemText>
          <Link href={`/categories/${category.id}`}>{category.name}</Link>
        </ListItemText>
      </ListItemInfo>

      <ListItemInfo className="@max-4xl:hidden">
        <ListItemTitle>Project</ListItemTitle>
        <ListItemText>
          <Link href={`/projects/${project.id}`}>{project.title}</Link>
        </ListItemText>
      </ListItemInfo>

      <ListItemInfo className="@max-5xl:hidden">
        <ListItemTitle>Status</ListItemTitle>
        <ListItemText>{status?.name}</ListItemText>
      </ListItemInfo>

      <div className="flex flex-none items-center justify-end gap-4">
        <ListItemProgress
          value={((subtasksDone || 0) / (totalSubtasks || 1)) * 100}
          showValueText={false}
          aria-label="task progress"
        />

        <div className="flex items-center gap-2">
          {assignee?.imageUrl ? (
            <Link href={`/users/${assignee.id}`}>
              <ImageContainer className="h-8 w-8">
                <Image fill src={assignee.imageUrl} alt={assignee.fullName} />
              </ImageContainer>
            </Link>
          ) : (
            <ImageContainer className="h-8 w-8" />
          )}

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
        </div>
      </div>
    </ListItem>
  );
};
