import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

export interface ProjectFilters {
  noActiveTasks?: boolean;
  status?: ProjectStatus[];
  category?: number[];
  customer?: number[];
  user?: string[];
  deadlineFrom?: Date;
  deadlineTo?: Date;
}

export interface TaskFilters {
  onlyMyTasks?: boolean;
  status?: TaskStatus[];
  category?: number[];
  project?: number[];
  assignee?: string[];
  deadlineFrom?: Date;
  deadlineTo?: Date;
}

export interface UserFilters {
  hasNoActiveTasks?: boolean;
  hasActiveTasks?: boolean;
  hasOverdueTasks?: boolean;
  position?: number[];
}

export interface CustomerFilters {
  hasNoActiveProjects?: boolean;
  hasActiveProjects?: boolean;
  hasOverdueProjects?: boolean;
  company?: number[];
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
