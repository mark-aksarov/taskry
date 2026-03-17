import {
  ActionFn,
  ActionState,
  DeleteTaskPayload,
  UpdateTaskStatusPayload,
} from "@/lib/actions/types";
import { TaskStatus } from "@/generated/prisma/enums";

export interface BaseTaskItemProps {
  id: number;
  title: string;
  deadline: string;
  assignee?: {
    id: string;
    imageUrl?: string;
    fullName: string;
  };
  commentsCount: number;
  status: TaskStatus;
  taskCommentsContainer: React.ReactNode;
  editTaskFormContainer: React.ReactNode;
  sendComment: ActionFn<ActionState, FormData>;
  updateComment: ActionFn<ActionState, FormData>;
  updateTask: ActionFn<ActionState, FormData>;
  deleteTask: ActionFn<ActionState, DeleteTaskPayload>;
  updateTaskStatus: ActionFn<ActionState, UpdateTaskStatusPayload>;
}
