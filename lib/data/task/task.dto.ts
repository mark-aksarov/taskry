import { Task } from "@/generated/prisma/browser";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

export type TaskSummaryDTO = {
  id: number;
  title: string;
};

export interface TaskDTO {
  id: number;
  title: string;
  description?: string;
  deadline: string;
  status: TaskStatus;
  projectId?: number;
  categoryId?: number;
  assigneeId?: string;
}

export interface CreateTaskInputDTO {
  title: string;
  description?: string;
  deadline: string;
  status: TaskStatus;
  projectId?: number;
  categoryId?: number;
  assigneeId?: string;
}

export interface UpdateTaskInputDTO {
  id: number;
  title?: string;
  description?: string | null;
  deadline?: string;
  status?: TaskStatus;
  projectId?: number | null;
  categoryId?: number | null;
  assigneeId?: string | null;
}

export interface TaskDetailDTO {
  id: number;
  title: string;
  description?: string;
  deadline: string;
  status: TaskStatus;

  creator?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };
  assignee?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };
  project?: {
    id: number;
    title: string;
  };
  category?: {
    id: number;
    name: string;
  };
  subtasks: {
    id: number;
    text: string;
    isDone: boolean;
  }[];
  commentsCount: number;
}

export interface TaskListDTO {
  items: TaskListItemDTO[];
  totalCount: number;
}

export interface TaskListItemDTO {
  id: number;
  title: string;
  status: TaskStatus;

  deadline: string;
  assignee?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };
  project?: {
    id: number;
    title: string;
    status: ProjectStatus;
  };
  category?: {
    id: number;
    name: string;
  };
  subtasks: {
    total: number;
    done: number;
  };
  commentsCount: number;
}

export function mapToTaskDTO(
  task: Pick<
    Task,
    | "id"
    | "title"
    | "description"
    | "deadline"
    | "status"
    | "projectId"
    | "categoryId"
    | "assigneeId"
  >,
): TaskDTO {
  return {
    id: task.id,
    title: task.title,
    description: task.description ?? undefined,
    deadline: task.deadline.toISOString(),
    status: task.status,
    projectId: task.projectId ?? undefined,
    categoryId: task.categoryId ?? undefined,
    assigneeId: task.assigneeId ?? undefined,
  };
}
