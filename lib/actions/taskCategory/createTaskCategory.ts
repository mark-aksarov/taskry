"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { taskCategorySchema } from "@/lib/schemas/taskCategory";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { createTaskCategory as createTaskCategoryQuery } from "@/lib/data/taskCategory/taskCategory.dal";

const schema = taskCategorySchema.omit({ id: true });

export async function createTaskCategory(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  try {
    // Parse and validate form data
    const parsed = schema.safeParse({ name: formData.get("name") });

    if (!parsed.success) {
      console.error("Validation error", parsed.error);

      return {
        status: "error",
        errorCode: "validationError",
      };
    }

    // Create task
    await createTaskCategoryQuery(parsed.data);
    revalidatePath("/Tasks");

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
