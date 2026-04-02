"use server";

import z from "zod";
import { ActionState } from "../types";
import { getTranslations } from "next-intl/server";
import { commentId, commentContent } from "@/lib/schemas/comment";
import { updateComment as updateCommentQuery } from "@/lib/data/comment/comment.dal";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

const schema = z.object({
  id: commentId,
  content: commentContent,
});

export async function updateComment(formData: FormData): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const input = Object.fromEntries(formData.entries());
    const parsedData = schema.parse(input);

    await updateCommentQuery(parsedData);

    return {
      status: "success",
      message: t("comment.update.success"),
    };
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("comment.update.error.internalServerError"),
    };
  }
}
