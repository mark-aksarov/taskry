"use client";

import {
  GridItemInfo,
  GridItemText,
  GridItemTitleDetailModalTrigger,
} from "@/components/common/Grid";

import {
  ItemBaseDetailModalTrigger,
  ItemBaseCommentsModalTrigger,
  ItemBaseUserImageContainer,
} from "@/components/common/ItemBase";

import { memo } from "react";
import { EditTaskModal } from "../EditTaskModal";
import { TaskDetailModal } from "../TaskDetailModal";
import { TaskItemActionMenuTrigger } from "../TaskItem";
import { TaskCommentsModal } from "../TaskCommentsModal";
import { TaskItemBaseBadge } from "../TaskItemBaseBadge";
import { TaskGridItemLayout } from "./TaskGridItemLayout";
import { useSelectedTasks } from "../SelectedTasksContext";
import { TaskGridItemProgress } from "./TaskGridItemProgress";
import { ItemBaseDeadline } from "@/components/common/ItemBase";
import { TaskItemCheckbox } from "../TaskItem/TaskItemCheckbox";
import { BaseTaskItemProps, TaskItemProviders } from "../TaskItem";
import { SelectableItem } from "@/components/common/SelectableItem";
import { UserDetailModal } from "@/components/users/UserDetailModal";

interface Props extends BaseTaskItemProps {
  subtasksTotal: number;
  subtasksDone: number;
  taskDetailContainer: React.ReactNode;
  userDetailContainer: React.ReactNode;
  userDetailHeaderContainer: React.ReactNode;
}

export function TaskGridItemLarge({
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
        <TaskGridItemLargeInner {...props} />
      </SelectableItem>
    </TaskItemProviders>
  );
}

type InnerProps = Omit<Props, "updateTask" | "deleteTask" | "updateTaskStatus">;

export const TaskGridItemLargeInner = memo(
  ({
    id,
    title,
    deadline,
    assignee,
    commentsCount,
    status,
    subtasksTotal,
    subtasksDone,
    taskCommentsContainer,
    editTaskFormContainer,
    taskDetailContainer,
    userDetailContainer,
    userDetailHeaderContainer,
    sendComment,
    updateComment,
  }: InnerProps) => {
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
        <TaskGridItemLayout
          checkboxSlot={<TaskItemCheckbox id={id} status={status} />}
          menuTriggerSlot={
            <TaskItemActionMenuTrigger
              taskId={id}
              taskTitle={title}
              taskStatus={status}
              className="-mr-2"
            />
          }
          titleSlot={
            <GridItemInfo className="flex-auto">
              <GridItemTitleDetailModalTrigger
                modal={
                  <TaskDetailModal
                    taskId={id}
                    taskDetailContainer={taskDetailContainer}
                  />
                }
              >
                {title}
              </GridItemTitleDetailModalTrigger>

              <GridItemText>
                <ItemBaseDeadline deadline={deadline} />
              </GridItemText>
            </GridItemInfo>
          }
          assigneeImageSlot={
            assignee ? (
              <>
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
              </>
            ) : (
              assigneeImg
            )
          }
          commentsSlot={
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
          statusSlot={
            <TaskItemBaseBadge
              taskId={id}
              deadline={deadline}
              status={status}
            />
          }
          progressSlot={
            <TaskGridItemProgress
              subtasksDone={subtasksDone}
              subtasksTotal={subtasksTotal}
            />
          }
        />

        {/* Modal for editing task details */}
        <EditTaskModal editTaskFormContainer={editTaskFormContainer} />
      </>
    );
  },
);
