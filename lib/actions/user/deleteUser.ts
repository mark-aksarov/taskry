"use server";

import { redirect } from "@/i18n/navigation";
import { ActionState, DeleteUserPayload } from "../types";
import { userId as userIdSchema } from "@/lib/schemas/user";
import { getLocale, getTranslations } from "next-intl/server";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { deleteUser as deleteUserQuery } from "@/lib/data/user/user.dal";

export async function deleteUser(
  payload: DeleteUserPayload,
): Promise<ActionState> {
  // Authorization
  const { session } = await requireFullAccess();

  const t = await getTranslations("actions");
  const internalServerError = t("user.delete.error.internalServerError");

  // Get active organization
  const organizationId = session.activeOrganizationId;

  if (!organizationId) {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  // Validation
  const result = userIdSchema.safeParse(payload.id);

  if (!result.success) {
    return {
      status: "error",
      // Show a generic error because the user cannot fix invalid id manually
      message: internalServerError,
    };
  }

  // Delete user from database
  const userId = result.data;

  try {
    await deleteUserQuery(userId);
  } catch {
    return {
      status: "error",
      message: internalServerError,
    };
  }

  // Success
  const locale = await getLocale();

  // Redirect to team page when user is deleted from profile page
  if (payload.shouldRedirect) {
    redirect({ href: "/team", locale });
  }

  return {
    status: "success",
    message: t("user.delete.success"),
  };
}
