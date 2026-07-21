import { TaskCategory } from "@/generated/prisma/browser";

export interface TaskCategoryDTO {
  id: number;
  name: string;
}

export interface CreateTaskCategoryInputDTO {
  name: string;
}

export interface UpdateTaskCategoryInputDTO {
  id: number;
  name: string;
}

export function mapToTaskCategoryDTO(
  taskCategory: Pick<TaskCategory, "id" | "name">,
): TaskCategoryDTO {
  return {
    id: taskCategory.id,
    name: taskCategory.name,
  };
}
