import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

export const taskStatuses = ["pending", "active", "completed"] as TaskStatus[];

export const ALLOWED_TASK_STATUSES_BY_PROJECT: Record<
  ProjectStatus,
  TaskStatus[]
> = {
  pending: ["pending", "completed"],
  active: ["pending", "active", "completed"],
  completed: ["completed"],
};

export const TRANSITION_TASK_STATUSES_BY_PROJECT: Record<
  ProjectStatus,
  Record<TaskStatus, TaskStatus>
> = {
  pending: {
    // When project becomes "pending"
    active: "pending", // Active tasks → Pending
    pending: "pending", // Pending tasks remain Pending
    completed: "completed", // Completed tasks remain Completed
  },
  active: {
    // When project becomes "active"
    pending: "active", // Pending tasks → Active
    active: "active", // Active tasks remain Active
    completed: "completed", // Completed tasks remain Completed
  },
  completed: {
    // When project becomes "completed"
    pending: "completed", // All tasks → Completed
    active: "completed",
    completed: "completed",
  },
};
