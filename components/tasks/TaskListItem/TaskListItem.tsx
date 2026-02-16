"use client";

import {
  ActionFn,
  ActionState,
  UpdateTaskStatusesPayload,
} from "@/lib/actions/types";

import {
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import Image from "next/image";
import { Link } from "@/components/ui/Link";
import { TaskStatus } from "@/generated/prisma/enums";
import { TaskItemCheckbox } from "../TaskItemCheckbox";
import { TaskItemBaseBadge } from "../TaskItemBaseBadge";
import { TaskListItemLayout } from "./TaskListItemLayout";
import { useFormatter, useTranslations } from "next-intl";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ImageContainer } from "@/components/common/ImageContainer";
import { UpdateTaskStatusProvider } from "../UpdateTaskStatusContext";
import { TaskCommentsModalTrigger } from "../TaskCommentsModalTrigger";
import { ItemBaseDetailModalTrigger } from "@/components/common/ItemBase";

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
  updateTaskStatus: ActionFn<ActionState, UpdateTaskStatusesPayload>;
}

export const TaskListItem = ({
  updateTaskStatus,
  ...props
}: TaskListItemProps) => {
  return (
    <UpdateTaskStatusProvider updateStatus={updateTaskStatus}>
      <TaskListItemInner {...props} />
    </UpdateTaskStatusProvider>
  );
};

export const TaskListItemInner = ({
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
}: Omit<TaskListItemProps, "updateTaskStatus">) => {
  const t = useTranslations("tasks.TaskListItem");

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
      checkboxSlot={
        showCheckbox && <TaskItemCheckbox id={id} status={status} />
      }
      titleSlot={
        <ListItemInfo>
          <ListItemTitle data-test="task-list-item-title">
            <ItemBaseDetailModalTrigger
              modal={taskDetailModal}
              className="truncate max-md:hidden"
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
              className="max-md:hidden"
            >
              {assigneeImg}
            </ItemBaseDetailModalTrigger>
          ) : (
            <UnknownUser className="h-9 w-9 max-md:hidden" />
          )}

          <ListItemInfo className="max-md:hidden">
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
        <TaskItemBaseBadge
          taskId={id}
          className="@max-lg:hidden"
          status={status}
        />
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
