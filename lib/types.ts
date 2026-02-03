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
