"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { subtaskSchema } from "@/lib/schemas/subtask";
import { deleteSubtask as deleteSubtaskQuery } from "@/lib/data/subtask/subtask.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

const schema = subtaskSchema.pick({ id: true });

export async function deleteSubtask(
  _prevState: ActionState,
  id: number,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  try {
    // Parse and validate form data
    const parsed = schema.safeParse({ id });

    if (!parsed.success) {
      console.error("Validation error", parsed.error);

      return {
        status: "error",
        errorCode: "validationError",
      };
    }

    // Delete tasks
    const result = await deleteSubtaskQuery(parsed.data.id);
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
