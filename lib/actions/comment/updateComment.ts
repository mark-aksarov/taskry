"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ActionState } from "../types";
import { redirect } from "@/i18n/navigation";
import { commentSchema } from "@/lib/schemas/comment";
import { getLocale, getTranslations } from "next-intl/server";
import { validateActionInput } from "../utils/validateActionInput";
import { actionError, actionSuccess } from "../utils/actionResult";
import { updateComment as updateCommentQuery } from "@/lib/data/comment/comment.dal";

const schema = commentSchema.pick({ id: true, content: true });

export async function updateComment(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const t = await getTranslations("actions.common");

  // Authorization
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    const locale = await getLocale();
    redirect({ href: "/sign-in", locale });
    return { status: "error", message: null };
  }

  try {
    const parsed = validateActionInput(schema, {
      id: formData.get("id"),
      content: formData.get("content"),
    });

    if (!parsed.success) {
      return actionError(t("validation.invalidInput"));
    }

    await updateCommentQuery(parsed.data);

    return actionSuccess();
  } catch (error) {
    console.error("Server Action Error:", error);

    return {
      status: "error",
      message: t("validation.internalServerError"),
    };
  }
}
