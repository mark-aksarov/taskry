"use client";

import Image from "next/image";
import { useMemo } from "react";
import { Item } from "react-stately";

import {
  Check,
  Clock,
  Trash,
  CircleEllipsis,
  MessageSquare,
} from "lucide-react";

import {
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import {
  ItemBaseBadge,
  ItemBaseButton,
  ItemBaseActionMenuTrigger,
  ItemBaseDetailModalTrigger,
  ItemBaseDetailBottomSheetTrigger,
} from "@/components/common/ItemBase";

import { TaskDetailModal } from "../TaskDetailModal";
import { TaskListItemLayout } from "./TaskListItemLayout";
import { Checkbox, RACDialogTrigger } from "@/components/ui";
import { TaskDetailBottomSheet } from "../TaskDetailBottomSheet";
import { ImageContainer } from "@/components/common/ImageContainer";

import { TaskCommentsModal } from "../TaskCommentsModal";
import { UnknownUser } from "@/components/common/UnknownUser";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { getTaskStatusBadgeColor } from "../getTaskStatusBadgeColor";
import { ProjectDetailModal } from "@/components/projects/ProjectDetailModal";

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

  const assigneeImg = assignee?.imageUrl ? (
    <ImageContainer className="h-9 w-9">
      <Image fill src={assignee.imageUrl} alt={assignee.fullName} />
    </ImageContainer>
  ) : (
    <UnknownUser className="h-9 w-9" />
  );

  return (
    <TaskListItemLayout
      checkboxSlot={showCheckbox && <Checkbox aria-label="task checkbox" />}
      titleSlot={
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
      assigneeSlot={
        <>
          {assignee ? (
            <ItemBaseDetailModalTrigger
              modal={<UserDetailModal userId={assignee.id} />}
              className="@max-2xl:hidden"
            >
              {assigneeImg}
            </ItemBaseDetailModalTrigger>
          ) : (
            <UnknownUser className="h-9 w-9 @max-2xl:hidden" />
          )}

          <ListItemInfo className="@max-2xl:hidden">
            <ListItemTitle>
              {assignee ? (
                <ItemBaseDetailModalTrigger
                  modal={<UserDetailModal userId={assignee.id} />}
                  className="truncate"
                >
                  {assignee.fullName}
                </ItemBaseDetailModalTrigger>
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
          <ListItemTitle>{category.name}</ListItemTitle>

          <ListItemText>Category</ListItemText>
        </ListItemInfo>
      }
      projectSlot={
        <ListItemInfo className="@max-4xl:hidden">
          <ListItemTitle>
            <ItemBaseDetailModalTrigger
              modal={<ProjectDetailModal projectId={project.id} />}
              className="truncate"
            >
              {project.title}
            </ItemBaseDetailModalTrigger>
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
          />
          <TaskCommentsModal taskId={id} />
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
