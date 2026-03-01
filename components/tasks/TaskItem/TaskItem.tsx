"use client";

import {
  ActionFn,
  ActionState,
  DeleteTasksPayload,
  UpdateTaskStatusesPayload,
} from "@/lib/actions/types";

import { TaskListItem } from "../TaskListItem";
import { TaskGridItem } from "../TaskGridItem";
import { TaskStatus } from "@/generated/prisma/enums";
import { useSelectedTasks } from "../SelectedTasksContext";
import { useViewMode } from "@/components/common/ViewMode";
import { TaskItemPendingOverlay } from "./TaskItemPendingOverlay";
import { SelectableItem } from "@/components/common/SelectableItem";
import { DeleteTaskTransitionProvider } from "../DeleteTaskTransitionContext";
import { UpdateTaskTransitionProvider } from "../UpdateTaskTransitionContext";
import { UpdateTaskStatusTransitionProvider } from "../UpdateTaskStatusTransitionContext";

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
  project: {
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
  projectDetailContainer: React.ReactNode;
  sendComment: ActionFn<ActionState, FormData>;
  updateComment: ActionFn<ActionState, FormData>;
  updateTaskStatus: ActionFn<ActionState, UpdateTaskStatusesPayload>;
  deleteTask: ActionFn<ActionState, DeleteTasksPayload>;
}

// We access batch update and delete state at this level
export function TaskItem(props: TaskItemProps) {
  const selected = useSelectedTasks();
  const { viewMode } = useViewMode();

  return (
    <DeleteTaskTransitionProvider>
      <UpdateTaskTransitionProvider>
        <UpdateTaskStatusTransitionProvider>
          <TaskItemPendingOverlay taskId={props.id}>
            <SelectableItem
              {...selected}
              item={{ id: props.id, status: props.status }}
            >
              {viewMode === "grid" ? (
                <TaskGridItem {...props} />
              ) : (
                <TaskListItem {...props} />
              )}
            </SelectableItem>
          </TaskItemPendingOverlay>
        </UpdateTaskStatusTransitionProvider>
      </UpdateTaskTransitionProvider>
    </DeleteTaskTransitionProvider>
  );
}
