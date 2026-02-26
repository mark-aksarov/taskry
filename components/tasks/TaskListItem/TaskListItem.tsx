"use client";

import {
  ActionFn,
  ActionState,
  UpdateTaskStatusesPayload,
} from "@/lib/actions/types";

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
            <ListItemText>{t("project")}</ListItemText>
          </>
        }
        statusSlot={
          <TaskItemBaseBadge
            isSelected={isSelected}
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
