import { ActionState } from "../types";

export const actionError = (message: string): ActionState => ({
  status: "error",
  message,
});

export const actionSuccess = (): ActionState => ({
  status: "success",
  message: null,
});
