"use server";

import { ActionState } from "../types";
import { revalidatePath } from "next/cache";
import { commentId } from "@/lib/schemas/comment";
import { getTranslations } from "next-intl/server";
import { deleteComment as deleteCommentQuery } from "@/lib/data/comment/comment.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

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

    revalidatePath("/projects");
    revalidatePath("/tasks");

    return {
      status: "success",
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("deleteComment.error.internalServerError"),
    };
  }
}
