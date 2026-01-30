export interface CreateSubtaskInputDTO {
  text: string;
  taskId: number;
}

export interface UpdateSubtaskInputDTO {
  id: number;
  isDone?: boolean;
  text?: string;
  taskId: number;
}
