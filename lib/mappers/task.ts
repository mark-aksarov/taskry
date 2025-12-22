import {
  TaskCategorySummaryDTO,
  TaskDetailDTO,
  TaskFormDataDTO,
  TaskListItemDTO,
  TaskSummaryDTO,
} from "../dto/task";
import {
  TaskCategorySummaryType,
  TaskDetailType,
  TaskFormDataType,
  TaskListItemType,
  TaskSummaryType,
} from "../types/task";

export function mapTaskSummaryToDTO(task: TaskSummaryType): TaskSummaryDTO {
  return {
    id: task.id,
    title: task.title,
  };
}

export const mapTaskFormDataToDTO = (
  task: TaskFormDataType,
): TaskFormDataDTO => {
  return {
    id: task.id,
    title: task.title,
    description: task.description ?? "",
    deadline: task.deadline,
    categoryId: task.categoryId,
    status: task.status,
    projectId: task.projectId,
    assigneeId: task.assigneeId ?? undefined,
  };
};

export function mapTaskDetailToDTO(task: TaskDetailType): TaskDetailDTO {
  return {
    id: task.id,
    title: task.title,
    description: task.description ?? undefined,
    deadline: task.deadline ?? undefined,

    assignee: task.assignee
      ? {
          id: task.assignee.id,
          fullName: task.assignee.fullName,
          imageUrl: task.assignee.imageUrl ?? undefined,
        }
      : undefined,

    status: task.status,
    project: task.project,
    category: task.category,
    subtasks: task.subtasks,
    attachments: task.attachments,
    commentsCount: task._count.comments,
  };
}

export function mapTaskListItemToDTO(task: TaskListItemType): TaskListItemDTO {
  return {
    id: task.id,
    title: task.title,
    deadline: task.deadline ?? undefined,

    assignee: task.assignee
      ? {
          id: task.assignee.id,
          fullName: task.assignee.fullName,
          imageUrl: task.assignee.imageUrl ?? undefined,
        }
      : undefined,

    status: task.status,
    project: task.project,
    category: task.category,
    subtasks: {
      total: task._count.subtasks,
      done: task.subtasks.filter((subtask) => subtask.isDone).length,
    },
    commentsCount: task._count.comments,
  };
}

export function mapTaskCategorySummaryToDTO(
  category: TaskCategorySummaryType,
): TaskCategorySummaryDTO {
  return {
    id: category.id,
    name: category.name,
  };
}
