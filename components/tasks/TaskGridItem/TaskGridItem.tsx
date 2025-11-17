"use client";

import {
  GridItemInfo,
  GridItemProgress,
  GridItemText,
  GridItemTitle,
} from "@/components/common/Grid";

import { Item } from "react-stately";
import {
  Check,
  CheckCheck,
  CircleEllipsis,
  Clock,
  MessageSquare,
  Trash,
} from "lucide-react";

import Image from "next/image";
import { useMemo } from "react";
import { TaskDetailModal } from "../TaskDetailModal";
import { Link, Checkbox, RACDialogTrigger } from "@/components/ui";
import { TaskGridItemLayout } from "./TaskGridItemLayout";
import { TaskDetailBottomSheet } from "../TaskDetailBottomSheet";
import { ImageContainer } from "@/components/common/ImageContainer";
import {
  ItemBaseActionMenuTrigger,
  ItemBaseBadge,
  ItemBaseButton,
  ItemBaseDetailBottomSheetTrigger,
  ItemBaseDetailModalTrigger,
} from "@/components/common/ItemBase";
import { getTaskStatusBadgeColor } from "../getTaskStatusBadgeColor";
import { TaskCommentsModal } from "../TaskCommentsModal";

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
    id: string;
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
      titleSlot={
        <GridItemInfo className="flex-auto">
          <GridItemTitle>
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
          </GridItemTitle>

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
      subtasksSlot={
        <ItemBaseButton
          label={subtasksDone}
          iconLeft={
            <CheckCheck size={16} strokeWidth={1.5} absoluteStrokeWidth />
          }
        />
      }
      statusSlot={
        <ItemBaseBadge color={getTaskStatusBadgeColor(status.id)}>
          {status.name}
        </ItemBaseBadge>
      }
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
