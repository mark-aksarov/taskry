export type DeadlineQuickFilter = "today" | "tomorrow" | "thisWeek" | "overdue";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

export interface ProjectFilters {
  query?: string;
  status?: ProjectStatus[];
  category?: number[];
  customer?: number[];
  user?: string[];
  deadline?: DeadlineQuickFilter;
  dateStart?: string;
  dateEnd?: string;
  noActiveTasks?: boolean;
}

export interface TaskFilters {
  query?: string;
  onlyMyTasks?: boolean;
  status?: TaskStatus[];
  category?: number[];
  project?: number[];
  assignee?: string[];
  deadline?: DeadlineQuickFilter;
  dateStart?: string;
  dateEnd?: string;
}

export interface UserFilters {
  query?: string;
  hasNoActiveTasks?: boolean;
  hasActiveTasks?: boolean;
  hasOverdueTasks?: boolean;
  position?: number[];
}

export interface CustomerFilters {
  hasNoActiveProjects?: boolean;
  hasActiveProjects?: boolean;
  hasOverdueProjects?: boolean;
  company: number[];
}
