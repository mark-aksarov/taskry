import { DeadlineQuickFilter } from "./common";
import { TaskStatus } from "@/generated/prisma/enums";

export interface TaskFilters {
  status: TaskStatus[];
  category: number[];
  project: number[];
  assignee: string[];
  deadline?: DeadlineQuickFilter;
  dateStart?: string;
  dateEnd?: string;
}
