import {
  TaskDetailDTO,
  TaskSummaryDTO,
  TaskFormDataDTO,
  TaskListItemDTO,
} from "./task.dto";

import {
  TaskDetailType,
  TaskSummaryType,
  TaskFormDataType,
  TaskListItemType,
} from "./task.select";

/**
 * Shared helper for mapping user/assignee objects
 */
const mapAssignee = (user: {
  id: string;
  fullName: string;
  imageUrl?: string | null;
}) => ({
  id: user.id,
  fullName: user.fullName,
  imageUrl: user.imageUrl ?? undefined,
});

export const mapTaskSummaryToDTO = (task: TaskSummaryType): TaskSummaryDTO => ({
  id: task.id,
  title: task.title,
});

export const mapTaskFormDataToDTO = (
  task: TaskFormDataType,
): TaskFormDataDTO => ({
  ...task,
  description: task.description ?? undefined,
  assigneeId: task.assigneeId ?? undefined,
});

export function mapTaskDetailToDTO(task: TaskDetailType): TaskDetailDTO {
  return {
    ...task,
    description: task.description ?? undefined,
    deadline: task.deadline ?? undefined,
    assignee: task.assignee ? mapAssignee(task.assignee) : undefined,
    commentsCount: task._count.comments,
    // category and project match the DTO structure directly
  };
}

export function mapTaskListItemToDTO(task: TaskListItemType): TaskListItemDTO {
  return {
    id: task.id,
    title: task.title,
    status: task.status,
    deadline: task.deadline ?? undefined,
    assignee: task.assignee ? mapAssignee(task.assignee) : undefined,
    project: task.project,
    category: task.category,
    commentsCount: task._count.comments,
    subtasks: {
      total: task._count.subtasks,
      done: task.subtasks.filter((s) => s.isDone).length,
    },
  };
}
