import { useActionState } from "react";

export type ActionFn<State, Payload> = Parameters<
  typeof useActionState<State, Payload>
>[0];

type ActionStatus = "error" | "success" | null;

export type ActionState = {
  status: ActionStatus;
  message: string | null;
};

export type DeleteProjectsPayload = number[];

export interface UpdateProjectStatusesPayload {
  ids: number[];
  nextStatus: string;
}
