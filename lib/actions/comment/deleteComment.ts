"use server";

import z from "zod";
import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { withAuthAction } from "../utils/withAuthAction";
import { validateActionInput } from "../utils/validateActionInput";
import { actionError, actionSuccess } from "../utils/actionResult";
import { deleteComment as deleteCommentQuery } from "@/lib/data/comment/comment.dal";

const schema = z.object({
  id: z.coerce.number().int().positive(),
});

export async function deleteComment(
  _prevState: ActionState,
  id: number,
): Promise<ActionState> {
  return withAuthAction(async () => {
    const t = await getTranslations("actions.common");

    const parsed = validateActionInput(schema, { id });

    if (!parsed.success) {
      return actionError(t("validation.invalidInput"));
    }

    await deleteCommentQuery(parsed.data.id);

    revalidatePath("/projects");
    revalidatePath("/tasks");

    return actionSuccess();
  });
}
