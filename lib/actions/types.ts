import { useActionState } from "react";

export type ActionFn<State, Payload = any> = Parameters<
  typeof useActionState<State, Payload>
>[0];

type ActionStatus = "error" | "success" | null;

export type SignInState = {
  status: ActionStatus;
  message: string | null;
  payload: FormData | null;
};

export type SignUpState = {
  status: ActionStatus;
  message: string | null;
  payload: FormData | null;
};

export type ForgetPasswordState = {
  status: ActionStatus;
  message: string | null;
  payload: FormData | null;
};

export type ResetPasswordState = {
  status: ActionStatus;
  message: string | null;
  payload: FormData | null;
};

export type DeleteProjectsState = {
  status: ActionStatus;
  message: string | null;
};

export type DeleteProjectsPayload = number[];

export interface UpdateProjectStatusesState {
  status: ActionStatus;
  message: string | null;
}

export interface UpdateProjectStatusesPayload {
  ids: number[];
  nextStatus: string;
}

export type CreateProjectState = {
  status: ActionStatus;
  message: string | null;
};
