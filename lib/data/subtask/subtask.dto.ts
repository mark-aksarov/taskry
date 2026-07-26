export interface SubtaskDTO {
  id: number;
  text: string;
  isDone: boolean;
  taskId: number;
}

export interface CreateSubtaskInputDTO {
  text: string;
  taskId: number;
}

export interface UpdateSubtaskInputDTO {
  id: number;
  isDone?: boolean;
  text?: string;
}
