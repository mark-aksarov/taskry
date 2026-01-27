"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { commentSchema } from "@/lib/schemas/comment";
import { withAuthAction } from "../utils/withAuthAction";
import { createComment } from "@/lib/data/comment/comment.dal";
import { validateActionInput } from "../utils/validateActionInput";
import { actionError, actionSuccess } from "../utils/actionResult";

const schema = commentSchema.omit({ id: true });

export async function sendComment(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return withAuthAction(async () => {
    const t = await getTranslations("actions.common");

    const parsed = validateActionInput(schema, {
      content: formData.get("content"),
      taskId: formData.get("taskId"),
      projectId: formData.get("projectId"),
    });

    if (!parsed.success) {
      return actionError(t("validation.invalidInput"));
    }

    await createComment(parsed.data);

    if (parsed.data.projectId) {
      revalidatePath("/projects");
    }

    if (parsed.data.taskId) {
      revalidatePath("/tasks");
    }

    return actionSuccess();
  });
}
