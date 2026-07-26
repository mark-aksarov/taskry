import { APIError } from "better-auth";
import { ActionState } from "../actions/types";

export function handleBetterAuthError(
  error: unknown,
  fallbackMessage: string,
): ActionState {
  console.error("Server Action Error:", error);

  if (error instanceof APIError && error.message) {
    return {
      status: "error",
      message: error.message,
    };
  }

  return {
    status: "error",
    message: fallbackMessage,
  };
}
