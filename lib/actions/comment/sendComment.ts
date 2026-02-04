"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { commentSchema } from "@/lib/schemas/comment";
import { createComment } from "@/lib/data/comment/comment.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

const schema = commentSchema.omit({ id: true });

export async function sendComment(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  try {
    // Parse and validate form data
    const parsed = schema.safeParse({
      content: formData.get("content"),
      taskId: formData.get("taskId"),
      projectId: formData.get("projectId"),
    });

    if (!parsed.success) {
      console.error("Validation error", parsed.error);

      return {
        status: "error",
        errorCode: "validationError",
      };
    }

    // Create comment
    await createComment(parsed.data);

    if (parsed.data.projectId) {
      revalidatePath("/projects");
    }

    if (parsed.data.taskId) {
      revalidatePath("/tasks");
    }

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
