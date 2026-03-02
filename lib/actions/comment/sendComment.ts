"use server";

import z from "zod";
import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { taskId } from "@/lib/schemas/task";
import { projectId } from "@/lib/schemas/project";
import { getTranslations } from "next-intl/server";
import { commentContent } from "@/lib/schemas/comment";
import { createComment } from "@/lib/data/comment/comment.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

const schema = z.object({
  content: commentContent,
  taskId: taskId.optional(),
  projectId: projectId.optional(),
});

export async function sendComment(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const input = Object.fromEntries(formData.entries());
    const parsedData = schema.parse(input);

    await createComment(parsedData);

    if (parsedData.projectId) {
      revalidatePath("/projects");
    }

    if (parsedData.taskId) {
      revalidatePath("/tasks");
    }

    return {
      status: "success",
      message: t("comment.create.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("comment.create.error"),
    };
  }
}
