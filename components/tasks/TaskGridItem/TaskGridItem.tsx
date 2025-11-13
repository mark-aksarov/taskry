"use client";

import {
  GridItemInfo,
  GridItemProgress,
  GridItemText,
} from "@/components/common/Grid";

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

import { useMemo } from "react";
import { Button, Link, Checkbox } from "@/components/ui";
import Image from "next/image";
import { ImageContainer } from "@/components/common/ImageContainer";
import { MenuDialogHeader } from "@/components/common/MenuDialogHeader";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";
import { TaskGridItemTitle } from "./TaskGridItemTitle";
import { TaskGridItemLayout } from "./TaskGridItemLayout";
import { TaskStatusBadge } from "../TaskStatusBadge";

export interface TaskGridItemProps {
  id: number;
  title: string;
  deadline: Date;
  assignee?: {
    id: string;
    imageUrl?: string;
    fullName: string;
  };
  status: {
    id: number;
    name: string;
  };
  comments: number;
  subtasks: number;
  subtasksDone: number;
}

export function TaskGridItem({
  id,
  title,
  deadline,
  assignee,
  status,
  comments,
  subtasks,
  subtasksDone,
}: TaskGridItemProps) {
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
    <TaskGridItemLayout
      checkboxSlot={<Checkbox aria-label={title} />}
      menuTriggerSlot={
        <ResponsiveMenuTrigger
          placement="bottom right"
          renderDialogHeader={() => <MenuDialogHeader heading="Actions" />}
          renderButton={() => (
            <Button
              aria-label="project menu"
              variant="ghost"
              iconLeft={
                <Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
              }
              className="-mr-2 rounded-full"
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
      titleSlot={
        <GridItemInfo className="flex-auto">
          <TaskGridItemTitle id={id} title={title} />

          <GridItemText>{`Deadline on ${formattedDeadline}`}</GridItemText>
        </GridItemInfo>
      }
      assigneeImageSlot={
        assignee?.imageUrl ? (
          <Link href={`/users/${assignee.id}`}>
            <ImageContainer className="h-9 w-9">
              <Image fill src={assignee.imageUrl} alt={assignee.fullName} />
            </ImageContainer>
          </Link>
        ) : (
          <ImageContainer className="h-9 w-9" />
        )
      }
      commentsSlot={
        <Button
          variant="outlined"
          label={comments}
          iconLeft={
            <MessageSquare size={16} strokeWidth={1.5} absoluteStrokeWidth />
          }
          className="h-[1.75rem] w-[3.75rem] justify-center rounded-full"
        />
      }
      subtasksSlot={
        <Button
          variant="outlined"
          label={subtasksDone}
          iconLeft={
            <CheckCheck size={16} strokeWidth={1.5} absoluteStrokeWidth />
          }
          className="h-[1.75rem] w-[3.75rem] justify-center rounded-full"
        />
      }
      statusSlot={<TaskStatusBadge status={status} />}
      progressSlot={
        <GridItemProgress
          value={(subtasksDone / subtasks) * 100}
          showValueText={false}
          aria-label="project progress"
        />
      }
    />
  );
}
