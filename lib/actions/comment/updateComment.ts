"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { commentId, commentContent } from "@/lib/schemas/comment";
import { updateComment as updateCommentQuery } from "@/lib/data/comment/comment.dal";

const schema = z.object({
  id: commentId,
  content: commentContent,
});

export async function updateComment(formData: FormData): Promise<ActionState> {
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

  // Update comment
  try {
    await updateCommentQuery(result.data);
  } catch {
    return {
      status: "error",
      message: t("comment.update.error.internalServerError"),
    };
  }

  return {
    status: "success",
    message: t("comment.update.success"),
  };
}
