"use server";

import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { commentSchema } from "@/lib/schemas/comment";
import { actionError, actionSuccess } from "../utils/actionResult";
import { updateComment as updateCommentQuery } from "@/lib/data/comment/comment.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

const schema = commentSchema.pick({ id: true, content: true });

export async function updateComment(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions.common");

  try {
    // Parse and validate form data
    const parsed = schema.safeParse({
      id: formData.get("id"),
      content: formData.get("content"),
    });

    if (!parsed.success) {
      console.error("Validation error", parsed.error);
      return actionError(t("validation.invalidInput"));
    }

    // Update comment
    await updateCommentQuery(parsed.data);

    return actionSuccess();
  } catch (error) {
    console.error("Server Action Error:", error);
    return actionError(t("validation.internalServerError"));
  }
}
