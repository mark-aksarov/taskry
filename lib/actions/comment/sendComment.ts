"use server";

import z from "zod";
import { ActionState } from "../types";
import { taskId } from "@/lib/schemas/task";
import { projectId } from "@/lib/schemas/project";
import { getTranslations } from "next-intl/server";
import { commentContent } from "@/lib/schemas/comment";
import { createComment } from "@/lib/data/comment/comment.dal";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";

const schema = z.object({
  content: commentContent,
  taskId: taskId.optional(),
  projectId: projectId.optional(),
});

export async function sendComment(formData: FormData): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");

  // Validation
  const input = Object.fromEntries(formData.entries());
  const result = schema.safeParse(input);

  if (!result.success) {
    return {
      status: "error",
      message: t("common.error.invalidData"),
    };
  }

  // Create comment
  try {
    await createComment(result.data);
  } catch {
    return {
      status: "error",
      message: t("comment.create.error.internalServerError"),
    };
  }

  return {
    status: "success",
    message: t("comment.create.success"),
  };
}
