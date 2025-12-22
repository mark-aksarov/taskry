import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

export type TaskSummaryDTO = {
  id: number;
  title: string;
};

export type TaskDetailDTO = {
  id: number;
  title: string;
  description?: string;
  deadline?: Date;

  assignee?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };

  status: TaskStatus;

  project: {
    id: number;
    title: string;
  };

  category: {
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
};

export type TaskListItemDTO = {
  id: number;
  title: string;
  deadline?: Date;

  assignee?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };

  status: TaskStatus;

  project: {
    id: number;
    title: string;
    status: ProjectStatus;
  };

  category: {
    id: number;
    name: string;
  };

  subtasks: {
    total: number;
    done: number;
  };
  commentsCount: number;
};

export interface TaskCategorySummaryDTO {
  id: number;
  name: string;
}

export interface CreateTaskInputDTO {
  title: string;
  description?: string;
  deadline: Date;
  categoryId: number;
  status: ProjectStatus;
  projectId: number;
  assigneeId?: string;
}
