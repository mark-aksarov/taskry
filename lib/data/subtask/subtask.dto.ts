import { Subtask } from "@/generated/prisma/browser";

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

export function mapToSubtaskDTO(
  subtask: Pick<Subtask, "id" | "text" | "isDone" | "taskId">,
): SubtaskDTO {
  return {
    id: subtask.id,
    text: subtask.text,
    isDone: subtask.isDone,
    taskId: subtask.taskId,
  };
}
