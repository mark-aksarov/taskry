"use server";

import { ActionState } from "../types";
import { commentId } from "@/lib/schemas/comment";
import { getTranslations } from "next-intl/server";
import { deleteComment as deleteCommentQuery } from "@/lib/data/comment/comment.dal";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";

export async function deleteComment(id: number): Promise<ActionState> {
  // Authorization
  await requireFullAccess();

  const t = await getTranslations("actions");
  const internalServerError = t("comment.delete.error.internalServerError");

  // Validation
  const result = commentId.safeParse(id);

  if (!result.success) {
    return {
      status: "error",
      // This id does not come from a user form, so the user cannot fix invalid input
      message: internalServerError,
    };
  }

  // Delete comment
  try {
    await deleteCommentQuery(result.data);
  } catch {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  return {
    status: "success",
    message: t("comment.delete.success"),
  };
}
