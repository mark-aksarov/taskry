"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { withAuthAction } from "../utils/withAuthAction";
import { createComment } from "@/lib/data/comment/comment.dal";
import { validateActionInput } from "../utils/validateActionInput";
import { actionError, actionSuccess } from "../utils/actionResult";
import { revalidatePath } from "next/cache";

const schema = z.object({
  content: z.string().min(1).max(1000),
  taskId: z.preprocess(
    (val) =>
      val === "" || val === undefined || val === null ? undefined : val,
    z.coerce.number().optional(),
  ),
  projectId: z.preprocess(
    (val) =>
      val === "" || val === undefined || val === null ? undefined : val,
    z.coerce.number().optional(),
  ),

  /*attachments: z
    .array(
      z.object({
        fileName: z.string().min(1).max(255),
      }),
    )
    .optional(),*/
});

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
