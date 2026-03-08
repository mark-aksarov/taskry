"use server";

import { ActionState } from "../types";
import { commentId } from "@/lib/schemas/comment";
import { getTranslations } from "next-intl/server";
import { deleteComment as deleteCommentQuery } from "@/lib/data/comment/comment.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";
import { NotFoundError } from "@/lib/data/utils/error";

export async function deleteComment(
  _prevState: ActionState,
  id: number,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const parsedId = commentId.parse(id);
    await deleteCommentQuery(parsedId);

    return {
      status: "success",
      message: t("comment.delete.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    if (error instanceof NotFoundError) {
      return {
        status: "error",
        errorCode: "notFound",
        message: t("comment.common.error.notFound"),
      };
    }

    return {
      status: "error",
      message: t("comment.delete.error.internalServerError"),
    };
  }
}
