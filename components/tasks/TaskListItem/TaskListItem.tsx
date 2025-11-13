"use client";

import Image from "next/image";
import { useMemo } from "react";
import { Item } from "react-stately";
import {
  Check,
  CheckCheck,
  CircleEllipsis,
  Clock,
  Ellipsis,
  MessageSquare,
  Trash,
} from "lucide-react";

import { Button, Checkbox, Link } from "@/components/ui";

import {
  ListItemInfo,
  ListItemText,
  ListItemTitle,
  ListItemImageInfo,
} from "@/components/common/List";

import { ImageContainer } from "@/components/common/ImageContainer";

import { TaskListItemTitle } from "./TaskListItemTitle";
import { MenuDialogHeader } from "@/components/common/MenuDialogHeader";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";
import { TaskListItemLayout } from "./TaskListItemLayout";
import { TaskStatusBadge } from "../TaskStatusBadge";

interface TaskListItemProps {
  id: number;
  title: string;
  deadline?: Date;
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
  comments: number;
  subtasks: number;
  showCheckbox?: boolean;
}

export const TaskListItem = ({
  id,
  title,
  deadline,
  assignee,
  category,
  project,
  status,
  comments,
  subtasks,
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
    <TaskListItemLayout
      checkboxSlot={showCheckbox && <Checkbox aria-label="task checkbox" />}
      titleSlot={
        <ListItemInfo>
          <TaskListItemTitle id={id} title={title} />
          <ListItemText>{`Deadline on ${formattedDeadline}`}</ListItemText>
        </ListItemInfo>
      }
      assigneeSlot={
        <ListItemImageInfo className="@max-2xl:hidden">
          {assignee?.imageUrl ? (
            <Link href={`/users/${assignee.id}`}>
              <ImageContainer className="h-9 w-9">
                <Image fill src={assignee.imageUrl} alt={assignee.fullName} />
              </ImageContainer>
            </Link>
          ) : (
            <ImageContainer className="h-9 w-9" />
          )}
          <ListItemTitle>Assignee</ListItemTitle>
          {assignee ? (
            <ListItemText>
              <Link className="block truncate" href={`/users=${assignee.id}`}>
                {assignee.fullName}
              </Link>
            </ListItemText>
          ) : (
            <ListItemText>Unknown assignee</ListItemText>
          )}
        </ListItemImageInfo>
      }
      categorySlot={
        <ListItemInfo className="@max-3xl:hidden">
          <ListItemTitle>Category</ListItemTitle>

          <ListItemText>
            <Link
              className="block truncate"
              href={`/categories/${category.id}`}
            >
              {category.name}
            </Link>
          </ListItemText>
        </ListItemInfo>
      }
      projectSlot={
        <ListItemInfo className="@max-4xl:hidden">
          <ListItemTitle>Project</ListItemTitle>
          <ListItemText>
            <Link className="block truncate" href={`/projects/${project.id}`}>
              {project.title}
            </Link>
          </ListItemText>
        </ListItemInfo>
      }
      statusSlot={
        <TaskStatusBadge
          className="w-[5.625rem] @max-lg:hidden"
          status={status}
        />
      }
      commentsModalTriggerSlot={
        <Button
          variant="outlined"
          label={comments}
          iconLeft={
            <MessageSquare size={16} strokeWidth={1.5} absoluteStrokeWidth />
          }
          className="h-[1.75rem] w-[3.75rem] justify-center rounded-full @max-md:hidden"
        />
      }
      subtasksModalTriggerSlot={
        <Button
          variant="outlined"
          label={subtasks}
          iconLeft={
            <CheckCheck size={16} strokeWidth={1.5} absoluteStrokeWidth />
          }
          className="h-[1.75rem] w-[3.75rem] justify-center rounded-full @max-md:hidden"
        />
      }
      menuTriggerSlot={
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
