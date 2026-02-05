import { useActionState } from "react";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

export type ActionFn<State, Payload> = Parameters<
  typeof useActionState<State, Payload>
>[0];

export type ActionStatus = "error" | "success" | null;

export type ActionState = {
  status: ActionStatus;
  errorCode?: string;
  message?: string;
};

export type DeleteCustomersPayload = number[];

export type DeleteProjectsPayload = number[];

export type DeleteTasksPayload = number[];

export interface UpdateProjectStatusesPayload {
  ids: number[];
  nextStatus: ProjectStatus;
}

export interface UpdateTaskStatusesPayload {
  ids: number[];
  nextStatus: TaskStatus;
}

export type MarkAsReadPayload = number[] | null;

export type ToggleSubtaskPayload = { id: number; isDone: boolean };
