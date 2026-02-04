"use server";

import { ActionState } from "../types";
import { commentSchema } from "@/lib/schemas/comment";
import { updateComment as updateCommentQuery } from "@/lib/data/comment/comment.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

const schema = commentSchema.pick({ id: true, content: true });

export async function updateComment(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  try {
    // Parse and validate form data
    const parsed = schema.safeParse({
      id: formData.get("id"),
      content: formData.get("content"),
    });

    if (!parsed.success) {
      console.error("Validation error", parsed.error);

      return {
        status: "error",
        errorCode: "validationError",
      };
    }

    // Update comment
    await updateCommentQuery(parsed.data);

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
