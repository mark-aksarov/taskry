import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

export type TaskSummaryDTO = {
  id: number;
  title: string;
};

export interface TaskFormDataDTO {
  id: number;
  title: string;
  description?: string;
  deadline: Date;
  status: TaskStatus;
  projectId: number;
  projectStatus: ProjectStatus;
  categoryId?: number;
  assigneeId?: string;
}

export interface CreateTaskInputDTO {
  title: string;
  description: string | null;
  deadline: Date;
  status: TaskStatus;
  projectId: number;
  categoryId: number | null;
  assigneeId: string | null;
}

export interface UpdateTaskInputDTO {
  id: number;
  title: string;
  description: string | null;
  deadline: Date;
  status: TaskStatus;
  projectId: number;
  categoryId: number | null;
  assigneeId: string | null;
}

export interface TaskDetailDTO {
  id: number;
  title: string;
  description?: string;
  deadline: Date;
  status: TaskStatus;

  assignee?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };
  project: {
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
  attachments: {
    id: number;
    fileUrl: string;
    fileName: string;
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

  deadline: Date;
  assignee?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };
  project: {
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

export interface TaskSearchDTO {
  items: TaskSearchItemDTO[];
  totalCount: number;
}

export interface TaskSearchItemDTO {
  id: number;
  title: string;
  deadline: Date;
}
