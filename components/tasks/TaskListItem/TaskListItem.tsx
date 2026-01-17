"use client";

import {
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import {
  ItemBaseBadge,
  ItemBaseDetailModalTrigger,
  ItemBaseDetailBottomSheetTrigger,
} from "@/components/common/ItemBase";

import Image from "next/image";
import { TaskDetailModal } from "../TaskDetailModal";
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
  showCheckbox?: boolean;
  commentModalTrigger?: React.ReactNode;
  menuTrigger?: React.ReactNode;
}

export const TaskListItem = ({
  id,
  title,
  deadline,
  assignee,
  category,
  project,
  status,
  showCheckbox,
  commentModalTrigger,
  menuTrigger,
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
          <ListItemTitle data-test="task-list-item-title">
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
            <ListItemTitle data-test="task-list-item-user-title">
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
          <ListItemTitle data-test="task-list-item-project-title">
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
      commentsModalTriggerSlot={commentModalTrigger}
      menuTriggerSlot={menuTrigger}
    />
  );
};
