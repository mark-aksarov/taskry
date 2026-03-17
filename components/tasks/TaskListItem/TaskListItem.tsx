"use client";

import {
  ListItemText,
  ListItemTitle,
  ListItemTitleDetailModalTrigger,
} from "@/components/common/List";

import {
  ItemBaseDetailModalTrigger,
  ItemBaseCommentsModalTrigger,
  ItemBaseUserImageContainer,
  ItemBaseDeadline,
} from "@/components/common/ItemBase";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { EditTaskModal } from "../EditTaskModal";
import { TaskDetailModal } from "../TaskDetailModal";
import { TaskCommentsModal } from "../TaskCommentsModal";
import { TaskItemBaseBadge } from "../TaskItemBaseBadge";
import { TaskListItemLayout } from "./TaskListItemLayout";
import { useSelectedTasks } from "../SelectedTasksContext";
import { TaskItemCheckbox } from "../TaskItem/TaskItemCheckbox";
import { TaskItemProviders, BaseTaskItemProps } from "../TaskItem";
import { SelectableItem } from "@/components/common/SelectableItem";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { ProjectDetailModal } from "@/components/projects/ProjectDetailModal";
import { TaskItemActionMenuTrigger } from "../TaskItem/TaskItemActionMenuTrigger";

export interface Props extends BaseTaskItemProps {
  category?: {
    id: number;
    name: string;
  };
  project?: {
    id: number;
    title: string;
  };
  taskDetailContainer: React.ReactNode;
  userDetailContainer: React.ReactNode;
  userDetailHeaderContainer: React.ReactNode;
  projectDetailContainer: React.ReactNode;
  showCheckbox?: boolean;
}

export function TaskListItem({
  updateTask,
  deleteTask,
  updateTaskStatus,
  ...props
}: Props) {
  const selected = useSelectedTasks();

  return (
    <TaskItemProviders
      taskId={props.id}
      deleteTask={deleteTask}
      updateTask={updateTask}
      updateTaskStatus={updateTaskStatus}
    >
      <SelectableItem
        {...selected}
        item={{ id: props.id, status: props.status }}
      >
        <TaskListItemInner {...props} />
      </SelectableItem>
    </TaskItemProviders>
  );
}

export type InnerProps = Omit<
  Props,
  "updateTask" | "deleteTask" | "updateTaskStatus"
>;

export const TaskListItemInner = memo(
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
    userDetailHeaderContainer,
    projectDetailContainer,
    sendComment,
    updateComment,
  }: InnerProps) => {
    const t = useTranslations("tasks.TaskListItem");

    const assigneeImg = (
      <ItemBaseUserImageContainer
        user={assignee}
        className="h-9 w-9"
        width={36}
        height={36}
      />
    );

    return (
      <>
        <TaskListItemLayout
          id={id}
          checkboxSlot={
            showCheckbox ? (
              <TaskItemCheckbox id={id} status={status} />
            ) : undefined
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

              <ListItemText>
                <ItemBaseDeadline deadline={deadline} />
              </ListItemText>
            </>
          }
          assigneeImgSlot={
            <>
              {assignee ? (
                <ItemBaseDetailModalTrigger
                  modal={
                    <UserDetailModal
                      userId={assignee.id}
                      userDetailHeaderContainer={userDetailHeaderContainer}
                      userDetailContainer={userDetailContainer}
                    />
                  }
                >
                  {assigneeImg}
                </ItemBaseDetailModalTrigger>
              ) : (
                assigneeImg
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
                      userDetailHeaderContainer={userDetailHeaderContainer}
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
