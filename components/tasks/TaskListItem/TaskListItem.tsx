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

import {
  ItemBaseDetailModalTrigger,
  ItemBaseCommentsModalTrigger,
} from "@/components/common/ItemBase";

import { memo } from "react";
import Image from "next/image";
import { TaskDetailModal } from "../TaskDetailModal";
import { TaskStatus } from "@/generated/prisma/enums";
import { TaskItemCheckbox } from "../TaskItemCheckbox";
import { TaskCommentsModal } from "../TaskCommentsModal";
import { TaskItemBaseBadge } from "../TaskItemBaseBadge";
import { TaskListItemLayout } from "./TaskListItemLayout";
import { useFormatter, useTranslations } from "next-intl";
import { useSelectedTasks } from "../SelectedTasksContext";
import { SelectableItem } from "../../common/SelectableItem";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ImageContainer } from "@/components/common/ImageContainer";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { UpdateTaskStatusProvider } from "../UpdateTaskStatusContext";
import { TaskItemActionMenuTrigger } from "../TaskItemActionMenuTrigger";
import { ProjectDetailModal } from "@/components/projects/ProjectDetailModal";

export interface TaskListItemProps {
  guestMode: boolean;
  id: number;
  title: string;
  deadline: string;
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
  taskCommentsContainer: React.ReactNode;
  editTaskFormContainer: React.ReactNode;
  taskDetailContainer: React.ReactNode;
  userDetailContainer: React.ReactNode;
  projectDetailContainer: React.ReactNode;
  sendComment: ActionFn<ActionState, FormData>;
  updateComment: ActionFn<ActionState, FormData>;
  updateTaskStatus: ActionFn<ActionState, UpdateTaskStatusesPayload>;
}

export const TaskListItem = ({
  updateTaskStatus,
  ...props
}: TaskListItemProps) => {
  const selected = useSelectedTasks();

  const isSelected = !!selected.get(props.id);

  return (
    <UpdateTaskStatusProvider updateStatus={updateTaskStatus}>
      <SelectableItem
        {...selected}
        item={{ id: props.id, status: props.status }}
      >
        <TaskListItemInner {...props} isSelected={isSelected} />
      </SelectableItem>
    </UpdateTaskStatusProvider>
  );
};

// `isSelected` is used in `TaskItemBaseBadge` because `useSelectedTasks` cannot be called inside it.
type TaskListItemInnerProps = Omit<TaskListItemProps, "updateTaskStatus"> & {
  isSelected?: boolean;
};

export const TaskListItemInner = memo(
  ({
    guestMode,
    isSelected,
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
  }: TaskListItemInnerProps) => {
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
      <TaskListItemLayout
        id={id}
        checkboxSlot={
          showCheckbox && <TaskItemCheckbox id={id} status={status} />
        }
        titleSlot={
          <ListItemInfo>
            <ListItemTitle data-test="task-list-item-title">
              <ItemBaseDetailModalTrigger
                modal={
                  <TaskDetailModal
                    taskId={id}
                    taskDetailContainer={taskDetailContainer}
                  />
                }
                className="truncate max-md:hidden"
              >
                {title}
              </ItemBaseDetailModalTrigger>

              <div className="truncate md:hidden">{title}</div>
            </ListItemTitle>

            <ListItemText>{deadlineOn}</ListItemText>
          </ListItemInfo>
        }
        assigneeSlot={
          <>
            {assignee ? (
              <ItemBaseDetailModalTrigger
                modal={
                  <UserDetailModal
                    userId={assignee.id}
                    userDetailContainer={userDetailContainer}
                  />
                }
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
                    modal={
                      <UserDetailModal
                        userId={assignee.id}
                        userDetailContainer={userDetailContainer}
                      />
                    }
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
                modal={
                  <ProjectDetailModal
                    projectId={project.id}
                    projectDetailContainer={projectDetailContainer}
                  />
                }
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
            isSelected={isSelected}
            className="@max-lg:hidden"
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
            guestMode={guestMode}
            taskId={id}
            taskTitle={title}
            taskStatus={status}
            editTaskFormContainer={editTaskFormContainer}
          />
        }
      />
    );
  },
);
