"use client";

import {
  ItemBaseDetailModalTrigger,
  ItemBaseCommentsModalTrigger,
} from "@/components/common/ItemBase";

import {
  ListItemText,
  ListItemTitle,
  ListItemTitleDetailModalTrigger,
} from "@/components/common/List";

import { memo } from "react";
import Image from "next/image";
import { TaskItemProps } from "../TaskItem";
import { EditTaskModal } from "../EditTaskModal";
import { TaskDetailModal } from "../TaskDetailModal";
import { TaskCommentsModal } from "../TaskCommentsModal";
import { TaskItemBaseBadge } from "../TaskItemBaseBadge";
import { TaskListItemLayout } from "./TaskListItemLayout";
import { useFormatter, useTranslations } from "next-intl";
import { UnknownUser } from "@/components/common/UnknownUser";
import { TaskItemCheckbox } from "../TaskItem/TaskItemCheckbox";
import { ImageContainer } from "@/components/common/ImageContainer";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { ProjectDetailModal } from "@/components/projects/ProjectDetailModal";
import { TaskItemActionMenuTrigger } from "../TaskItem/TaskItemActionMenuTrigger";

export type TaskListItemProps = Omit<
  TaskItemProps,
  | "subtasksTotal"
  | "subtasksDone"
  | "updateTask"
  | "deleteTask"
  | "updateTaskStatus"
>;

export const TaskListItem = memo(
  ({
    id,
    title,
    deadline,
    assignee,
    category,
    project,
    commentsCount,
    status,
    showCheckbox,
    taskCommentsContainer,
    editTaskFormContainer,
    taskDetailContainer,
    userDetailContainer,
    projectDetailContainer,
    sendComment,
    updateComment,
  }: TaskListItemProps) => {
    const t = useTranslations("tasks.TaskListItem");

    // use useFormatter to format the date according to the user's locale
    const format = useFormatter();

    const deadlineOn = t("deadlineOn", {
      date: format.dateTime(new Date(deadline), {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    });

    const assigneeImg = assignee?.imageUrl ? (
      <ImageContainer className="h-9 w-9">
        <Image
          src={assignee.imageUrl}
          alt={assignee.fullName}
          width={36}
          height={36}
        />
      </ImageContainer>
    ) : (
      <UnknownUser className="h-9 w-9" />
    );

    return (
      <>
        <TaskListItemLayout
          id={id}
          checkboxSlot={
            showCheckbox && <TaskItemCheckbox id={id} status={status} />
          }
          mainSlot={
            <>
              <ListItemTitleDetailModalTrigger
                modal={
                  <TaskDetailModal
                    taskId={id}
                    taskDetailContainer={taskDetailContainer}
                  />
                }
              >
                {title}
              </ListItemTitleDetailModalTrigger>

              <ListItemText>{deadlineOn}</ListItemText>
            </>
          }
          mainMobileSlot={
            <>
              <ListItemTitle>{title}</ListItemTitle>
              <ListItemText>{deadlineOn}</ListItemText>
            </>
          }
          assigneeImgSlot={
            <>
              {assignee ? (
                <ItemBaseDetailModalTrigger
                  modal={
                    <UserDetailModal
                      userId={assignee.id}
                      userDetailContainer={userDetailContainer}
                    />
                  }
                >
                  {assigneeImg}
                </ItemBaseDetailModalTrigger>
              ) : (
                <UnknownUser className="h-9 w-9" />
              )}
            </>
          }
          assigneeSlot={
            <>
              {assignee ? (
                <ListItemTitleDetailModalTrigger
                  modal={
                    <UserDetailModal
                      userId={assignee.id}
                      userDetailContainer={userDetailContainer}
                    />
                  }
                >
                  {assignee.fullName}
                </ListItemTitleDetailModalTrigger>
              ) : (
                <ListItemTitle>{t("noAssignee")}</ListItemTitle>
              )}

              <ListItemText>{t("assignee")}</ListItemText>
            </>
          }
          categorySlot={
            <>
              <ListItemTitle>
                {category ? category.name : t("noCategory")}
              </ListItemTitle>
              <ListItemText>{t("category")}</ListItemText>
            </>
          }
          projectSlot={
            <>
              {project ? (
                <ListItemTitleDetailModalTrigger
                  modal={
                    <ProjectDetailModal
                      projectId={project.id}
                      projectDetailContainer={projectDetailContainer}
                    />
                  }
                >
                  {project.title}
                </ListItemTitleDetailModalTrigger>
              ) : (
                <ListItemTitle>{t("noProject")}</ListItemTitle>
              )}

              <ListItemText>{t("project")}</ListItemText>
            </>
          }
          statusSlot={
            <TaskItemBaseBadge
              taskId={id}
              deadline={deadline}
              status={status}
            />
          }
          commentsModalTriggerSlot={
            <ItemBaseCommentsModalTrigger
              data-test={`task-${id}-comments-modal-trigger`}
              commentsCount={commentsCount}
              modal={
                <TaskCommentsModal
                  taskId={id}
                  taskCommentsContainer={taskCommentsContainer}
                  sendComment={sendComment}
                  updateComment={updateComment}
                />
              }
            />
          }
          menuTriggerSlot={
            <TaskItemActionMenuTrigger
              taskId={id}
              taskTitle={title}
              taskStatus={status}
            />
          }
        />

        {/* Modal for editing task details */}
        <EditTaskModal editTaskFormContainer={editTaskFormContainer} />
      </>
    );
  },
);
