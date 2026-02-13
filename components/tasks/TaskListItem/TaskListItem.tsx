"use client";

import {
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import {
  ItemBaseBadge,
  ItemBaseDetailModalTrigger,
} from "@/components/common/ItemBase";

import Image from "next/image";
import { Link } from "@/components/ui/Link";
import { TaskStatus } from "@/generated/prisma/enums";
import { TaskListItemLayout } from "./TaskListItemLayout";
import { useFormatter, useTranslations } from "next-intl";
import { UnknownUser } from "@/components/common/UnknownUser";
import { TaskListItemCheckbox } from "./TaskListItemCheckbox";
import { ImageContainer } from "@/components/common/ImageContainer";
import { getTaskStatusBadgeColor } from "../getTaskStatusBadgeColor";
import { useSyncSelectionTaskItem } from "@/lib/hooks/useTaskSelection";
import { TaskCommentsModalTrigger } from "../TaskCommentsModalTrigger";

export interface TaskListItemProps {
  id: number;
  title: string;
  deadline: Date;
  assignee?: {
    id: string;
    imageUrl?: string;
    fullName: string;
  };
  category?: {
    id: number;
    name: string;
  };
  project: {
    id: number;
    title: string;
  };
  commentsCount: number;
  status: TaskStatus;
  showCheckbox?: boolean;
  taskCommentsModal: React.ReactNode;
  menuTrigger: React.ReactNode;
  taskDetailModal: React.ReactNode;
  userDetailModal: React.ReactNode;
  projectDetailModal: React.ReactNode;
}

export const TaskListItem = ({
  id,
  title,
  deadline,
  assignee,
  category,
  project,
  commentsCount,
  status,
  showCheckbox,
  taskCommentsModal,
  menuTrigger,
  taskDetailModal,
  userDetailModal,
  projectDetailModal,
}: TaskListItemProps) => {
  const tStatus = useTranslations("tasks.TaskStatus");
  const t = useTranslations("tasks.TaskListItem");

  useSyncSelectionTaskItem(id, title, status);

  const format = useFormatter();

  const deadlineOn = t("deadlineOn", {
    date: format.dateTime(deadline, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  });

  const assigneeImg = assignee?.imageUrl ? (
    <ImageContainer className="h-9 w-9">
      <Image fill src={assignee.imageUrl} alt={assignee.fullName} />
    </ImageContainer>
  ) : (
    <UnknownUser className="h-9 w-9" />
  );

  return (
    <TaskListItemLayout
      id={id}
      checkboxSlot={showCheckbox && <TaskListItemCheckbox id={id} />}
      titleSlot={
        <ListItemInfo>
          <ListItemTitle data-test="task-list-item-title">
            <ItemBaseDetailModalTrigger
              modal={taskDetailModal}
              className="truncate"
            >
              {title}
            </ItemBaseDetailModalTrigger>

            <Link className="block truncate md:hidden" href={`/tasks/${id}`}>
              {title}
            </Link>
          </ListItemTitle>

          <ListItemText>{deadlineOn}</ListItemText>
        </ListItemInfo>
      }
      assigneeSlot={
        <>
          {assignee ? (
            <ItemBaseDetailModalTrigger
              modal={userDetailModal}
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
                  modal={userDetailModal}
                  className="truncate"
                >
                  {assignee.fullName}
                </ItemBaseDetailModalTrigger>
              ) : (
                t("noAssignee")
              )}
            </ListItemTitle>

            <ListItemText>{t("assignee")}</ListItemText>
          </ListItemInfo>
        </>
      }
      categorySlot={
        <ListItemInfo className="@max-3xl:hidden">
          <ListItemTitle>
            {category ? category.name : t("noCategory")}
          </ListItemTitle>
          <ListItemText>{t("category")}</ListItemText>
        </ListItemInfo>
      }
      projectSlot={
        <ListItemInfo className="@max-4xl:hidden">
          <ListItemTitle data-test="task-list-item-project-title">
            <ItemBaseDetailModalTrigger
              modal={projectDetailModal}
              className="truncate"
            >
              {project.title}
            </ItemBaseDetailModalTrigger>
          </ListItemTitle>
          <ListItemText>{t("project")}</ListItemText>
        </ListItemInfo>
      }
      statusSlot={
        <ItemBaseBadge
          className="@max-lg:hidden"
          color={getTaskStatusBadgeColor(status)}
        >
          {tStatus(`${status}`)}
        </ItemBaseBadge>
      }
      commentsModalTriggerSlot={
        <TaskCommentsModalTrigger
          data-test={`task-${id}-comments-modal-trigger`}
          commentsCount={commentsCount}
          modal={taskCommentsModal}
        />
      }
      menuTriggerSlot={menuTrigger}
    />
  );
};
