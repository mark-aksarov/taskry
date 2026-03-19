import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

export interface ProjectFilters {
  query?: string;
  noActiveTasks?: boolean;
  status?: ProjectStatus[];
  category?: number[];
  customer?: number[];
  user?: string[];
  deadlineFrom?: string;
  deadlineTo?: string;
}

export interface TaskFilters {
  query?: string;
  onlyMyTasks?: boolean;
  status?: TaskStatus[];
  category?: number[];
  project?: number[];
  assignee?: string[];
  deadlineFrom?: string;
  deadlineTo?: string;
}

export interface UserFilters {
  query?: string;
  hasNoActiveTasks?: boolean;
  hasActiveTasks?: boolean;
  hasOverdueTasks?: boolean;
  position?: number[];
}

export interface CustomerFilters {
  query?: string;
  hasNoActiveProjects?: boolean;
  hasActiveProjects?: boolean;
  hasOverdueProjects?: boolean;
  companyIds?: number[];
}

export const taskSortFields = [
  "createdAt",
  "title",
  "deadline",
  "status",
  "category",
] as const;

export type TaskSortField = (typeof taskSortFields)[number];

export const projectSortFields = [
  "createdAt",
  "title",
  "deadline",
  "status",
  "category",
] as const;

export type ProjectSortField = (typeof projectSortFields)[number];

export const customerSortFields = ["fullName", "company"] as const;

export type CustomerSortField = (typeof customerSortFields)[number];

export const userSortFields = ["fullName", "position"] as const;

export type UserSortField = (typeof userSortFields)[number];
