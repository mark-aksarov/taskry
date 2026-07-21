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
