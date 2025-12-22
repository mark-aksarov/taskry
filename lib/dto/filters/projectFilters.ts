import { DeadlineQuickFilter } from "./common";
import { ProjectStatus } from "@/generated/prisma/enums";

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
