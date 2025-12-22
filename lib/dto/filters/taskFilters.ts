import { TaskStatus } from "@/generated/prisma/enums";

export type DeadlineQuickFilter = "today" | "tomorrow" | "overdue";

export interface TaskFilters {
  status: TaskStatus[];
  category: number[];
  project: number[];
  assignee: string[];
  deadline?: DeadlineQuickFilter;
  dateStart?: string;
  dateEnd?: string;
}
