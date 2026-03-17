"use client";

import {
  GridItemInfo,
  GridItemText,
  GridItemTitle,
} from "@/components/common/Grid";

import {
  ItemBaseDeadline,
  ItemBaseUserImageContainer,
  ItemBaseCommentsModalTrigger,
} from "@/components/common/ItemBase";

import { memo } from "react";
import { Link } from "@/components/ui/Link";
import { EditTaskModal } from "../EditTaskModal";
import { TaskItemActionMenuTrigger } from "../TaskItem";
import { TaskCommentsModal } from "../TaskCommentsModal";
import { TaskItemBaseBadge } from "../TaskItemBaseBadge";
import { TaskGridItemLayout } from "./TaskGridItemLayout";
import { TaskGridItemProgress } from "./TaskGridItemProgress";
import { BaseTaskItemProps, TaskItemProviders } from "../TaskItem";

interface Props extends BaseTaskItemProps {
  subtasksTotal: number;
  subtasksDone: number;
}

export function TaskGridItemMobile({
  updateTask,
  deleteTask,
  updateTaskStatus,
  ...props
}: Props) {
  return (
    <TaskItemProviders
      taskId={props.id}
      deleteTask={deleteTask}
      updateTask={updateTask}
      updateTaskStatus={updateTaskStatus}
    >
      <div className="relative block">
        <Link href={`/tasks/${props.id}`} className="absolute inset-0 z-0" />
        <TaskGridItemMobileInner {...props} />
      </div>
    </TaskItemProviders>
  );
}

type InnerProps = Omit<Props, "updateTask" | "deleteTask" | "updateTaskStatus">;

export const TaskGridItemMobileInner = memo(
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
    sendComment,
    updateComment,
  }: InnerProps) => {
    const assigneeImg = (
      <ItemBaseUserImageContainer
        user={assignee}
        className="z-1 h-11 w-11"
        width={44}
        height={44}
      />
    );

    return (
      <>
        <TaskGridItemLayout
          menuTriggerSlot={
            <TaskItemActionMenuTrigger
              taskId={id}
              taskTitle={title}
              taskStatus={status}
              className="relative z-1 -mr-2 ml-auto"
            />
          }
          titleSlot={
            <GridItemInfo className="flex-auto">
              <GridItemTitle>{title}</GridItemTitle>
              <GridItemText>
                <ItemBaseDeadline deadline={deadline} />
              </GridItemText>
            </GridItemInfo>
          }
          assigneeImageSlot={
            assignee ? (
              <Link href={`/team/${assignee.id}`}>{assigneeImg}</Link>
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
              className="relative z-1"
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
