"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { commentSchema } from "@/lib/schemas/comment";
import { deleteComment as deleteCommentQuery } from "@/lib/data/comment/comment.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

const schema = commentSchema.pick({ id: true });

export async function deleteComment(
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

    // Delete comment
    await deleteCommentQuery(parsed.data.id);

    revalidatePath("/projects");
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
