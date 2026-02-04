"use server";

import { revalidatePath } from "next/cache";
import { subtaskSchema } from "@/lib/schemas/subtask";
import { ActionState, ToggleSubtaskPayload } from "../types";
import { updateSubtask as updateSubtaskQuery } from "@/lib/data/subtask/subtask.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

const schema = subtaskSchema.pick({ id: true, isDone: true });

export async function toggleSubtask(
  _prevState: ActionState,
  data: ToggleSubtaskPayload,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  try {
    // Parse and validate form data
    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      console.error("Validation error", parsed.error);

      return {
        status: "error",
        errorCode: "validationError",
      };
    }

    // Execute update
    const result = await updateSubtaskQuery(parsed.data);

    // Revalidation
    revalidatePath(`/tasks/${result.taskId}`);

    return {
      status: "success",
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      errorCode: "internalServerError",
    };
  }
}
