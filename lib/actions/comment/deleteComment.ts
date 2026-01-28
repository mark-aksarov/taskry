"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { commentSchema } from "@/lib/schemas/comment";
import { actionError, actionSuccess } from "../utils/actionResult";
import { deleteComment as deleteCommentQuery } from "@/lib/data/comment/comment.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

const schema = commentSchema.pick({ id: true });

export async function deleteComment(
  _prevState: ActionState,
  id: number,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions.common");

  try {
    // Parse and validate form data
    const parsed = schema.safeParse({ id });

    if (!parsed.success) {
      console.error("Validation error", parsed.error);
      return actionError(t("validation.invalidInput"));
    }

    // Delete comment
    await deleteCommentQuery(parsed.data.id);

    revalidatePath("/projects");
    revalidatePath("/tasks");

    return actionSuccess();
  } catch (error) {
    console.error("Server Action Error:", error);
    return actionError(t("validation.internalServerError"));
  }
}
