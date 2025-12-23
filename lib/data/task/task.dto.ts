import { DeadlineQuickFilter } from "../utils/date";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

export interface BaseTaskDTO {
  id: number;
  title: string;
  description?: string;
  deadline: Date;
  status: TaskStatus;
  projectId: number;
  categoryId: number;
  assigneeId?: string;
}

export type TaskSummaryDTO = Pick<BaseTaskDTO, "id" | "title">;

export interface TaskFormDataDTO extends BaseTaskDTO {
  status: ProjectStatus;
}

export interface CreateTaskInputDTO extends Omit<TaskFormDataDTO, "id"> {}

export interface UpdateTaskInputDTO extends TaskFormDataDTO {}

export interface TaskDetailDTO
  extends Omit<BaseTaskDTO, "projectId" | "categoryId" | "assigneeId"> {
  deadline: Date;
  assignee?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };
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
}

export interface TaskListItemDTO
  extends Pick<BaseTaskDTO, "id" | "title" | "status"> {
  deadline?: Date;
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
  category: {
    id: number;
    name: string;
  };
  subtasks: {
    total: number;
    done: number;
  };
  commentsCount: number;
}

export interface TaskFilters {
  status: TaskStatus[];
  category: number[];
  project: number[];
  assignee: string[];
  deadline?: DeadlineQuickFilter;
  dateStart?: string;
  dateEnd?: string;
}
