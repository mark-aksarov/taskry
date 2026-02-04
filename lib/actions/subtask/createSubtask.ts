"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { subtaskSchema } from "@/lib/schemas/subtask";
import { createSubtask as createSubtaskQuery } from "@/lib/data/subtask/subtask.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

const schema = subtaskSchema.omit({ id: true });

export async function createSubtask(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  try {
    // Parse and validate form data
    const input = Object.fromEntries(formData.entries());
    const parsed = schema.safeParse(input);

    if (!parsed.success) {
      console.error("Validation error", parsed.error);

      return {
        status: "error",
        errorCode: "validationError",
      };
    }

    // Execute create
    await createSubtaskQuery(parsed.data);

    // Revalidation
    revalidatePath(`/tasks/${parsed.data.taskId}`);

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
