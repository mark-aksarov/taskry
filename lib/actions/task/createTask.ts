"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { taskSchema } from "@/lib/schemas/task";
import { createTask as createTaskQuery } from "@/lib/data/task/task.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

const schema = taskSchema.omit({ id: true });

export async function createTask(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    status: "error",
    errorCode: "validationError",
  };

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
    await createTaskQuery(parsed.data);

    // Revalidation
    revalidatePath("/projects");

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
