import { Project } from "@/generated/prisma/browser";
import { ProjectStatus } from "@/generated/prisma/enums";

export interface ProjectSummaryDTO {
  id: number;
  title: string;
}

export interface CreateProjectInputDTO {
  title: string;
  description?: string;
  deadline: string;
  clientId?: number;
  categoryId?: number;
  status: ProjectStatus;
}

export interface UpdateProjectInputDTO {
  id: number;
  title?: string;
  description?: string | null;
  deadline?: string;
  clientId?: number | null;
  categoryId?: number | null;
  status?: ProjectStatus;
}

export interface ProjectDTO {
  id: number;
  title: string;
  description?: string;
  deadline: string;
  status: ProjectStatus;
  categoryId?: number;
  clientId?: number;
}

export interface ProjectDetailDTO {
  id: number;
  title: string;
  description?: string;
  deadline: string;
  status: ProjectStatus;
  categoryId?: number;
  clientId?: number;

  creator?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };

  client?: {
    id: number;
    fullName: string;
  };

  category?: {
    id: number;
    name: string;
  };

  tasks: {
    total: number;
    active: number;
    pending: number;
    completed: number;
  };
}

export interface ProjectListDTO {
  items: ProjectListItemDTO[];
  totalCount: number;
}

export interface ProjectListItemDTO {
  id: number;
  title: string;
  status: ProjectStatus;
  deadline: string;

  creator?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };

  category?: {
    id: number;
    name: string;
  };

  client?: {
    id: number;
    fullName: string;
    imageUrl?: string;
  };

  company?: {
    id: number;
    name: string;
  };

  commentsCount: number;

  tasks: {
    total: number;
    completed: number;
  };
}

export function mapToProjectDTO(
  position: Pick<
    Project,
    | "id"
    | "title"
    | "description"
    | "deadline"
    | "status"
    | "categoryId"
    | "clientId"
  >,
): ProjectDTO {
  return {
    id: position.id,
    title: position.title,
    description: position.description ?? undefined,
    deadline: position.deadline.toISOString(),
    status: position.status,
    categoryId: position.categoryId ?? undefined,
    clientId: position.clientId ?? undefined,
  };
}
