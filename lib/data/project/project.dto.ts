import { ProjectStatus } from "@/generated/prisma/enums";
import { DeadlineQuickFilter } from "../utils/date";

export interface BaseProjectDTO {
  id: number;
  title: string;
  description?: string;
  deadline: Date;
  status: ProjectStatus;
  categoryId: number;
  customerId?: number;
}

export type ProjectSummaryDTO = Pick<BaseProjectDTO, "id" | "title">;

export interface ProjectFormDataDTO extends BaseProjectDTO {}

export interface ProjectDetailDTO
  extends Omit<BaseProjectDTO, "categoryId" | "customerId"> {
  deadline: Date;
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
}

export interface ProjectListItemDTO
  extends Pick<BaseProjectDTO, "id" | "title" | "status"> {
  deadline: Date;
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

export interface CreateProjectInputDTO extends Omit<BaseProjectDTO, "id"> {}

export interface UpdateProjectInputDTO
  extends Partial<Omit<BaseProjectDTO, "id">> {
  id: BaseProjectDTO["id"];
}

export interface ProjectFilters {
  status: ProjectStatus[];
  category: number[];
  customer: number[];
  user: string[];
  deadline?: DeadlineQuickFilter;
  dateStart?: string;
  dateEnd?: string;
  noActiveTasks?: boolean;
}
