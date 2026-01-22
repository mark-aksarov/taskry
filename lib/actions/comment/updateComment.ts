"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { withAuthAction } from "../utils/withAuthAction";
import { validateActionInput } from "../utils/validateActionInput";
import { actionError, actionSuccess } from "../utils/actionResult";
import { updateComment as updateCommentQuery } from "@/lib/data/comment/comment.dal";

const schema = z.object({
  id: z.coerce.number().int().positive(),
  content: z.string().min(1).max(1000),
});

export async function updateComment(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return withAuthAction(async () => {
    const t = await getTranslations("actions.common");

    const parsed = validateActionInput(schema, {
      id: formData.get("id"),
      content: formData.get("content"),
    });

    if (!parsed.success) {
      return actionError(t("validation.invalidInput"));
    }

    await updateCommentQuery(parsed.data);

    return actionSuccess();
  });
}
