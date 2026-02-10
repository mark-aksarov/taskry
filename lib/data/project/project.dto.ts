import { ProjectStatus } from "@/generated/prisma/enums";

export interface ProjectSummaryDTO {
  id: number;
  title: string;
}

export interface CreateProjectInputDTO {
  title: string;
  description?: string;
  deadline: Date;
  customerId?: number | null;
  categoryId?: number | null;
  status: ProjectStatus;
}

export interface UpdateProjectInputDTO {
  id: number;
  title?: string;
  description?: string;
  deadline?: Date;
  customerId?: number | null;
  categoryId?: number | null;
  status?: ProjectStatus;
}

export interface ProjectFormDataDTO {
  id: number;
  title: string;
  description?: string;
  deadline: Date;
  status: ProjectStatus;
  categoryId?: number;
  customerId?: number;
}

export interface ProjectDetailDTO {
  id: number;
  title: string;
  description?: string;
  deadline: Date;
  status: ProjectStatus;
  categoryId?: number;
  customerId?: number;

  creator?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };

  customer?: {
    id: number;
    fullName: string;
  };

  category?: {
    id: number;
    name: string;
  };

  attachments: {
    id: number;
    fileName: string;
    fileUrl: string;
  }[];
}

export interface ProjectListDTO {
  items: ProjectListItemDTO[];
  totalCount: number;
}

export interface ProjectListItemDTO {
  id: number;
  title: string;
  status: ProjectStatus;
  deadline: Date;

  creator?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };

  category?: {
    id: number;
    name: string;
  };

  customer?: {
    id: number;
    fullName: string;
    imageUrl?: string;
    company?: {
      id: number;
      name: string;
    };
  };

  commentsCount: number;

  tasks: {
    total: number;
    completed: number;
  };
}

export interface ProjectSearchDTO {
  items: ProjectSearchItemDTO[];
  totalCount: number;
}

export interface ProjectSearchItemDTO {
  id: number;
  title: string;
  deadline: Date;
}
