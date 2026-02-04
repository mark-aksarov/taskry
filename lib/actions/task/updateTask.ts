"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { taskSchema } from "@/lib/schemas/task";
import { updateTask as updateTaskQuery } from "@/lib/data/task/task.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

export async function updateTask(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  try {
    // Parse and validate form data
    const input = Object.fromEntries(formData.entries());
    const parsed = taskSchema.safeParse(input);

    if (!parsed.success) {
      console.error("Validation error", parsed.error);

      return {
        status: "error",
        errorCode: "validationError",
      };
    }

    // Execute update
    await updateTaskQuery(parsed.data);

    // Revalidation
    revalidatePath("/tasks");

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
