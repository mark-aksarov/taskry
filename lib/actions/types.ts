import { useActionState } from "react";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

export type ActionFn<State, Payload> = Parameters<
  typeof useActionState<State, Payload>
>[0];

export type ActionStatus = "error" | "success" | null;
export type ActionErrorCode = "badRequest" | "notFound" | "internalServerError";

export type ActionState = {
  status: ActionStatus;
  errorCode?: string;
  message?: string;
};

export type CreatePresignedUrlState = {
  status: ActionStatus;
  presignedPost?: {
    url: string;
    fields: Record<string, string>;
  };
  message?: string;
};

export type DeleteCommentPayload = {
  id: number;
  taskId?: number;
  projectId?: number;
};

export type DeleteProjectPayload = {
  id: number;
  shouldRedirect: boolean;
};

export type DeleteTaskPayload = {
  id: number;
  shouldRedirect: boolean;
};

export type DeleteCustomerPayload = {
  id: number;
  shouldRedirect: boolean;
};

export type DeleteUserPayload = {
  id: string;
  shouldRedirect: boolean;
};

export type UpdateUserImageUrlPayload = {
  id: string;
  imageUrl: string;
};

export type UpdateCustomerImageUrlPayload = {
  id: number;
  imageUrl: string;
};

export interface UpdateProjectStatusPayload {
  id: number;
  nextStatus: ProjectStatus;
}

export interface UpdateProjectStatusesPayload {
  ids: number[];
  nextStatus: ProjectStatus;
}

export interface UpdateTaskStatusPayload {
  id: number;
  nextStatus: TaskStatus;
}

export interface UpdateTaskStatusesPayload {
  ids: number[];
  nextStatus: TaskStatus;
}

export type MarkAsReadPayload = number[] | null;

export type ToggleSubtaskPayload = { id: number; isDone: boolean };

export interface ActionContextType<TPayload = FormData> {
  state: ActionState;
  action: (payload: TPayload) => void;
  isPending: boolean;
}
