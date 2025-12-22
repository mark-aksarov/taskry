"use client";

import {
  ActionFn,
  ActionState,
  DeleteProjectsPayload,
  UpdateTaskStatusesPayload,
} from "@/lib/actions/types";

import {
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import {
  ItemBaseBadge,
  ItemBaseButton,
  ItemBaseDetailModalTrigger,
  ItemBaseDetailBottomSheetTrigger,
} from "@/components/common/ItemBase";

import Image from "next/image";
import { MessageSquare } from "lucide-react";
import { RACDialogTrigger } from "@/components/ui";
import { TaskDetailModal } from "../TaskDetailModal";
import { TaskCommentsModal } from "../TaskCommentsModal";
import { TaskListItemLayout } from "./TaskListItemLayout";
import { useFormatter, useTranslations } from "next-intl";
import { UnknownUser } from "@/components/common/UnknownUser";
import { TaskListItemCheckbox } from "./TaskListItemCheckbox";
import { TaskDetailBottomSheet } from "../TaskDetailBottomSheet";
import { ImageContainer } from "@/components/common/ImageContainer";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { getTaskStatusBadgeColor } from "../getTaskStatusBadgeColor";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";
import { useSyncSelectionTaskItem } from "@/lib/hooks/useTaskSelection";
import { TaskItemActionMenuTrigger } from "../TaskItemActionMenuTrigger";
import { ProjectDetailModal } from "@/components/projects/ProjectDetailModal";

export interface TaskListItemProps {
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
    status: ProjectStatus;
  };
  status: TaskStatus;
  commentsCount: number;
  showCheckbox?: boolean;
  deleteAction: ActionFn<ActionState, DeleteProjectsPayload>;
  updateStatusAction: ActionFn<ActionState, UpdateTaskStatusesPayload>;
}

export const TaskListItem = ({
  id,
  title,
  deadline,
  assignee,
  category,
  project,
  status,
  commentsCount,
  showCheckbox,
  deleteAction,
  updateStatusAction,
}: TaskListItemProps) => {
  const t = useTranslations("tasks");

  useSyncSelectionTaskItem(id, title, status, project.status);

  const format = useFormatter();

  const deadlineOn = deadline
    ? t("TaskListItem.deadlineOn", {
        date: format.dateTime(deadline, {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      })
    : t("TaskListItem.noDeadline");

  const assigneeImg = assignee?.imageUrl ? (
    <ImageContainer className="h-9 w-9">
      <Image fill src={assignee.imageUrl} alt={assignee.fullName} />
    </ImageContainer>
  ) : (
    <UnknownUser className="h-9 w-9" />
  );

  return (
    <TaskListItemLayout
      checkboxSlot={showCheckbox && <TaskListItemCheckbox id={id} />}
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

          <ListItemText>{deadlineOn}</ListItemText>
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
                t("TaskListItem.unknownAssignee")
              )}
            </ListItemTitle>

            <ListItemText>{t("TaskListItem.assignee")}</ListItemText>
          </ListItemInfo>
        </>
      }
      categorySlot={
        <ListItemInfo className="@max-3xl:hidden">
          <ListItemTitle>{category.name}</ListItemTitle>
          <ListItemText>{t("TaskListItem.category")}</ListItemText>
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
          <ListItemText>{t("TaskListItem.project")}</ListItemText>
        </ListItemInfo>
      }
      statusSlot={
        <ItemBaseBadge
          className="@max-lg:hidden"
          color={getTaskStatusBadgeColor(status)}
        >
          {t(`TaskStatus.${status}`)}
        </ItemBaseBadge>
      }
      commentsModalTriggerSlot={
        <RACDialogTrigger>
          <ItemBaseButton
            label={commentsCount}
            iconLeft={
              <MessageSquare size={16} strokeWidth={1.5} absoluteStrokeWidth />
            }
          />
          <TaskCommentsModal taskId={id} />
        </RACDialogTrigger>
      }
      menuTriggerSlot={
        <TaskItemActionMenuTrigger
          taskId={id}
          taskTitle={title}
          taskStatus={status}
          projectStatus={project.status}
          deleteAction={deleteAction}
          updateStatusAction={updateStatusAction}
        />
      }
    />
  );
};
