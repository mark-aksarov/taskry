import { ProjectStatus } from "@/generated/prisma/enums";

export type ProjectSummaryDTO = {
  id: number;
  title: string;
};

export type ProjectFormDataDTO = {
  id: number;
  title: string;
  description?: string;
  deadline: Date;
  categoryId: number;
  status: ProjectStatus;
  customerId?: number;
};

export type ProjectDetailDTO = {
  id: number;
  title: string;
  description?: string;
  deadline?: Date;
  status: string;

  creator?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };

  customer?: {
    id: number;
    fullName: string;
  };

  category: {
    id: number;
    name: string;
  };

  attachments: {
    id: number;
    fileName: string;
    fileUrl: string;
  }[];
};

export interface ProjectListItemDTO {
  id: number;
  title: string;
  deadline?: Date;
  status: string;

  creator?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };

  category: {
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

export interface ProjectCategorySummaryDTO {
  id: number;
  name: string;
}

export interface CreateProjectInputDTO {
  title: string;
  description?: string;
  deadline: Date;
  categoryId: number;
  status: ProjectStatus;
  customerId?: number;
}

export interface CreateProjectCategoryInputDTO {
  name: string;
}

export interface UpdateProjectInputDTO {
  id: number;
  title: string;
  description?: string;
  deadline: Date;
  categoryId: number;
  status: ProjectStatus;
  customerId?: number;
}
