"use client";

import Image from "next/image";
import { useMemo } from "react";
import { Item } from "react-stately";
import {
  Check,
  CheckCheck,
  CircleEllipsis,
  Clock,
  MessageSquare,
  Trash,
} from "lucide-react";

import { Button, Checkbox, Link, RACDialogTrigger } from "@/components/ui";

import {
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import { TaskListItemLayout } from "./TaskListItemLayout";
import { ImageContainer } from "@/components/common/ImageContainer";
import { TaskDetailModal } from "../TaskDetailModal";
import { TaskDetailBottomSheet } from "../TaskDetailBottomSheet";
import {
  ItemBaseActionMenuTrigger,
  ItemBaseBadge,
  ItemBaseButton,
  ItemBaseDetailBottomSheetTrigger,
  ItemBaseDetailModalTrigger,
} from "@/components/common/ItemBase";
import { getTaskStatusBadgeColor } from "../getTaskStatusBadgeColor";
import { TaskCommentsModal } from "../TaskCommentsModal";
import { UpdateSubtasksModal } from "@/components/subtasks/UpdateSubtasksModal/UpdateSubtasksModal";
import { UnknownUser } from "@/components/common/UnknownUser";

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
    id: string;
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
      assigneeSlot={
        <>
          {assignee?.imageUrl ? (
            <Link className="@max-2xl:hidden" href={`/users/${assignee.id}`}>
              <ImageContainer className="h-9 w-9">
                <Image fill src={assignee.imageUrl} alt={assignee.fullName} />
              </ImageContainer>
            </Link>
          ) : (
            <UnknownUser className="h-9 w-9 @max-2xl:hidden" />
          )}
          <ListItemInfo className="@max-2xl:hidden">
            <ListItemTitle>
              {assignee ? (
                <Link className="block truncate" href={`/users=${assignee.id}`}>
                  {assignee.fullName}
                </Link>
              ) : (
                "Unknown assignee"
              )}
            </ListItemTitle>
            <ListItemText>Assignee</ListItemText>
          </ListItemInfo>
        </>
      }
      categorySlot={
        <ListItemInfo className="@max-3xl:hidden">
          <ListItemTitle>
            <Link
              className="block truncate"
              href={`/categories/${category.id}`}
            >
              {category.name}
            </Link>
          </ListItemTitle>

          <ListItemText>Category</ListItemText>
        </ListItemInfo>
      }
      projectSlot={
        <ListItemInfo className="@max-4xl:hidden">
          <ListItemTitle>
            <Link className="block truncate" href={`/projects/${project.id}`}>
              {project.title}
            </Link>
          </ListItemTitle>
          <ListItemText>Project</ListItemText>
        </ListItemInfo>
      }
      statusSlot={
        <ItemBaseBadge
          className="@max-lg:hidden"
          color={getTaskStatusBadgeColor(status.id)}
        >
          {status.name}
        </ItemBaseBadge>
      }
      commentsModalTriggerSlot={
        <RACDialogTrigger>
          <ItemBaseButton
            label={comments}
            iconLeft={
              <MessageSquare size={16} strokeWidth={1.5} absoluteStrokeWidth />
            }
            className="@max-md:hidden"
          />
          <Button
            variant="ghost"
            iconLeft={
              <MessageSquare size={16} strokeWidth={1.5} absoluteStrokeWidth />
            }
            className="rounded-full @md:hidden"
          />
          <TaskCommentsModal taskId={id} />
        </RACDialogTrigger>
      }
      subtasksModalTriggerSlot={
        <RACDialogTrigger>
          <ItemBaseButton
            label={subtasks}
            iconLeft={
              <CheckCheck size={16} strokeWidth={1.5} absoluteStrokeWidth />
            }
            className="@max-md:hidden"
          />
          <Button
            variant="ghost"
            iconLeft={
              <CheckCheck size={16} strokeWidth={1.5} absoluteStrokeWidth />
            }
            className="rounded-full @md:hidden"
          />
          <UpdateSubtasksModal taskId={id} />
        </RACDialogTrigger>
      }
      menuTriggerSlot={
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
