"use client";

import {
  ActionFn,
  ActionState,
  DeleteTaskPayload,
  UpdateTaskStatusPayload,
} from "@/lib/actions/types";

import { TaskListItem } from "../TaskListItem";
import { TaskGridItem } from "../TaskGridItem";
import { TaskStatus } from "@/generated/prisma/enums";
import { TaskItemProviders } from "./TaskItemProviders";
import { useViewMode } from "@/components/common/ViewMode";

export interface TaskItemProps {
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
  project?: {
    id: number;
    title: string;
  };
  subtasksTotal: number;
  subtasksDone: number;
  commentsCount: number;
  status: TaskStatus;
  showCheckbox?: boolean;
  taskCommentsContainer: React.ReactNode;
  editTaskFormContainer: React.ReactNode;
  taskDetailContainer: React.ReactNode;
  userDetailContainer: React.ReactNode;
  userDetailHeaderContainer: React.ReactNode;
  projectDetailContainer: React.ReactNode;
  sendComment: ActionFn<ActionState, FormData>;
  updateComment: ActionFn<ActionState, FormData>;
  updateTask: ActionFn<ActionState, FormData>;
  deleteTask: ActionFn<ActionState, DeleteTaskPayload>;
  updateTaskStatus: ActionFn<ActionState, UpdateTaskStatusPayload>;
}

// We access batch update and delete state at this level
export function TaskItem({
  updateTask,
  deleteTask,
  updateTaskStatus,
  ...props
}: TaskItemProps) {
  const { viewMode } = useViewMode();

  return (
    <TaskItemProviders
      taskId={props.id}
      taskStatus={props.status}
      deleteTask={deleteTask}
      updateTask={updateTask}
      updateTaskStatus={updateTaskStatus}
    >
      {viewMode === "grid" ? (
        <TaskGridItem {...props} />
      ) : (
        <TaskListItem {...props} />
      )}
    </TaskItemProviders>
  );
}
