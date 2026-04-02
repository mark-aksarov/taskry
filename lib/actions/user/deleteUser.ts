"use server";

import { APIError } from "better-auth";
import { userId } from "@/lib/schemas/user";
import { redirect } from "@/i18n/navigation";
import { ActionState, DeleteUserPayload } from "../types";
import { getLocale, getTranslations } from "next-intl/server";
import { deleteUser as deleteUserService } from "@/lib/data/user/user.service";
import { requireSessionOrRedirect } from "@/lib/data/utils/requireSessionOrRedirect";

export async function deleteUser(
  payload: DeleteUserPayload,
): Promise<ActionState> {
  // Authorization
  await requireSessionOrRedirect();

  const t = await getTranslations("actions");

  try {
    const parsedId = userId.parse(payload.id);
    await deleteUserService(parsedId);
  } catch (error) {
    console.error("Server Action Error:", error);

    if (error instanceof APIError) {
      return {
        status: "error",
        message: t("common.error.authError", { message: error.message }),
      };
    }

    return {
      status: "error",
      message: t("user.delete.error.internalServerError"),
    };
  }

  const locale = await getLocale();

  if (payload.shouldRedirect) {
    redirect({ href: "/team", locale });
  }

  return {
    status: "success",
    message: t("user.delete.success"),
  };
}
